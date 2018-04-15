const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');



//newstuff below
const multer = require('multer');
const AWS = require('AWS-SDK')

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
        limits: { fileSize: 52428800 },
    });
    
    //newstuff above
    
    
require('dotenv').config();
    
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const app = express();

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
    successRedirect: 'http://localhost:3000/profile/',
    failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/auth/logout', (req,res) => {
    
    req.logOut();
    res.redirect(`https://erix-domain.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost:3000&client_id=${CLIENT_ID}`)
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


// app.post('/sendpics', (req, res, next) => {
//     console.log("hit sendpics in server")
    
//     app.get('db').create_listing(req.user.id, req.body.picsArr).then( data => 
//         res.status(200).send(data)
//     )
// })


app.post('/upload', upload.single('theseNamesMustMatch'), (req, res) => {
    console.log('hit router s3 in server')
    // req.file is the 'theseNamesMustMatch' file

    const { key } = req.query;
    console.log(req.query.key, "key from server");
    s3.putObject({
        Bucket: 'yardsaleapp333',
        Key: `${key}.jpeg`, 
        Body: req.file.buffer,
        ACL: 'public-read', // your permisions  
      }, (err) => { 
        if (err) return res.status(400).send(err);
        res.send('File uploaded to S3');
    })
})

app.post('/twiliotest', (req, res) => {
    const {sender, message, phone} = req.body;
    console.log(req.body)

    client.messages.create({
        to: `+1${phone}`,
        from: '+13853360756',
        body: `You have a message from Yard Sale: ${message} 
        contact: Brian at ${sender}` }, function(err, data){
            if(err){
                console.log(err);
            }else{
                console.log(data)
            }
        }).then( res.status(200).send("it worked"))
})


app.post('/createlisting', (req, res, next) => {
    const { name, description, price, city, stateUSA, cat, text } = req.body;
    console.log(req.body, "req.body from server")
    app.get('db').create_listing(req.user.id, price, city, stateUSA, name, cat, description, text).then(
        data => res.status(200).send(data)
    )
})

app.get('/userlistings', (req, res, next) => {

    app.get('db').get_user_listings(req.user.id).then(
        data => res.status(200).send(data)
    )
})

app.delete('/deletelisting', (req, res, next) => {

    app.get('db').delete_listing(req.query.list).then( resp => {
        res.status(200).send(resp)
    })
})


app.get('/alllistings', (req, res, next) => {
    const { price, state, city} = req.query
    app.get('db').get_all_listings(price , state, city).then( resp => {
        res.status(200).send(resp)
    })
})


app.post('/allfromcat', (req, res, next) => {
    const { cat } = req.body;
    const { price, state, city} = req.query;

    console.log(req.body.cat, 'cat from server')
    app.get('db').get_from_cat(cat, price, state, city).then( resp => {
        res.status(200).send(resp)
    })
})

app.post('/editlisting', (req, res, next) => {

    app.get('db').edit_listing(req.body.listId).then( resp => {
        res.status(200).send(resp)
    })
})


app.post('/viewlisting', (req, res, next) => {
    // console.log(req.body)

    app.get('db').view_listing(req.body.itemId).then( resp => {
        res.status(200).send(resp)
    })
})

app.post('/userlike', (req, res, next) => {
        console.log(req.body, 'bodybody')
    app.get('db').likes(req.user.id, req.body.itemId).then( resp => {
        console.log(resp, "in likes")
        res.status(200).send(resp)
    })
})

app.post('/newlike', (req, res, next) => {

    app.get('db').new_like(req.user.id, req.body.itemId).then( resp => {
        res.status(200).send(resp)

        console.log(resp, 'resp from server')
    })
})



app.listen(SERVER_PORT, () => console.log(`listening on port: ${SERVER_PORT}`) )