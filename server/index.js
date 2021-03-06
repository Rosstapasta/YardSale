const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


//newstuff below
const multer = require('multer');
const AWS = require('aws-sdk')

const s3 = new AWS.S3();

AWS.config.update(
    {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        subregion: 'us-west-2',
    });
    
    // const router = new express.Router();
    
    // Multer config
    // memory storage keeps file data in a buffer
const upload = multer({
        storage: multer.memoryStorage(),
        // file size limitation in bytes
        limits: { fileSize: 200000 },
    });
    
    
require('dotenv').config();
    
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const app = express();
//new
app.use( express.static( `${__dirname}/../build` ) );

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
});

app.use( bodyParser.json() );

app.use( session({ 
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db')
    db.find_user([profile.id]).then( users => {
        if(!users[0]){
            db.create_user([profile.id]).then( res => {
                done(null, res[0].id);
            })
        }else {
            done(null, users[0].id)
        }
    })
}))

passport.serializeUser( (id, done) => {
    done(null, id)
})

passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then(user => {
        done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    
    //changed redirect from 3035 to 3000 might have to change back when run build
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT
}))

app.get('/auth/logout', (req,res) => {
    
    req.logOut();
    res.redirect(`https://erix-domain.auth0.com/v2/logout?returnTo=http%3A%2F%2F${process.env.LOCAL_HOST}&client_id=${CLIENT_ID}`)
})


app.get('/checkauth', (req, res, next) => {
    if(req.user){
        res.status(200).send(req.user)
    }else{
        res.status(500).send('ha! get lost')
    }
})

app.get('/checkauth2', (req, res, next) => {
    if(req.user){
        res.status(200).send([{id: 1}])
    }else{
        res.status(200).send([{id: 0}])
    }
})

app.get('/logout2', (req, res, next) => {
    session.destroy()
})

app.post('/upload', upload.single('theseNamesMustMatch'), (req, res) => {
    // req.file is the 'theseNamesMustMatch' file
    const { key, type } = req.query;
    
    s3.putObject({
        Bucket: 'yardsaleapp333',
        Key: `${key}.${type}`, 
        Body: req.file.buffer,
        ACL: 'public-read', 
      }, (err) => { 
        if (err) return res.status(400).send(err);
        res.send('File uploaded to S3');
    })
})

app.post('/twiliotest', (req, res) => {
    const {sender, message, phone, senderName, email} = req.body;

    client.messages.create({
        to: `+1${phone}`,
        from: '+13853360756',
        body: `New message from Yard Sale!
         ${message} 
        contact: ${ senderName } at ${sender} ${email}` }, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log(data)
            }
        }).then( res.status(200).send("it worked"))
})


app.post('/createlisting', (req, res, next) => {
    const { name, description, price, city, stateUSA, cat, text } = req.body;
    const zero = 0;

    app.get('db').create_listing(req.user.id, price, city, stateUSA, name, cat, description, text, zero).then(
        data => res.status(200).send(data)
    )
})

app.get('/userlistings', (req, res, next) => {

    if(req.user.id){
    app.get('db').get_user_listings(req.user.id).then(
        data => res.status(200).send(data)
    )}else{
        res.status(500).send('nope')
    }
})

app.delete('/deletelisting', (req, res, next) => {
    app.get('db').delete_listing(req.query.list).then( resp => {
        res.status(200).send(resp)
    })
})


app.get('/alllistings', (req, res, next) => {
    const { price, state, city, minprice, item} = req.query
    app.get('db').get_all_listings(price , state, city, minprice, item).then( resp => {
        res.status(200).send(resp)
    })
})


app.post('/allfromcat', (req, res, next) => {
    const { cat } = req.body;
    const { price, state, city, minprice, item} = req.query;
    app.get('db').get_from_cat(cat, price, state, city, minprice, item).then( resp => {
        res.status(200).send(resp)
    })
})

app.post('/editlisting', (req, res, next) => {
    app.get('db').edit_listing(req.body.listId).then( resp => {
        res.status(200).send(resp)
    })
})


app.post('/viewlisting', (req, res, next) => {
    app.get('db').view_listing(req.body.itemId).then( resp => {
        res.status(200).send(resp)
    })
})

app.post('/userlike', (req, res, next) => {

    if(req.user){
        app.get('db').likes(req.user.id, req.body.itemId).then( resp => {
            res.status(200).send(resp)
        })
    }else{
        res.status(500).send('no user')
    }
})

app.post('/newlike', (req, res, next) => {
    app.get('db').new_like(req.user.id, req.body.itemId, req.body.newLike).then( resp => {
        res.status(200).send(resp)
    })
})

app.delete('/unlike', (req, res, next) => {
    app.get('db').delete_like(req.user.id, req.query.itemId, req.query.newLike).then( resp => {
        res.status(200).send(resp)
    })
})

app.get('/landing', (req, res, next) => {

    app.get('db').get_favorites().then( resp => {
        res.status(200).send(resp)
    })
})

app.put('/updatep', (req, res, next) => {
    const { fname, lname, phone} = req.body;
    app.get('db').update_profile(fname, lname, phone, req.user.id).then( resp => {
        res.status(200).send("updated")
    })
})


app.get('/getuser', (req, res, next) => {

    if(req.user.id){
        app.get('db').find_session_user(req.user.id).then( resp => {
            res.status(200).send(resp)
        })
    }else{
        res.status(500).send('notfound')
    }
})

app.get('/getlikecount', (req, res, next) => {
       
    app.get('db').likes_count(req.query.itemId).then( resp => {
        res.status(200).send(resp)
    })

})


app.put('/updatelisting', (req, res, next) => {
        const { item, price, city, stateUSA, listId } = req.body;
    app.get('db').update_listing( item, price, city, stateUSA, listId ).then( resp => {
        res.status(200).send(resp)
    })
})


app.get('/myfavorites', (req, res, next) => {

    app.get('db').get_my_favorites(req.user.id).then( resp => {
        res.status(200).send(resp)
    })
})


app.listen(SERVER_PORT, () => console.log(`listening on port: ${SERVER_PORT}`) )