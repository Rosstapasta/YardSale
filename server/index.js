const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();

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

app.listen(SERVER_PORT, () => console.log(`listening on port: ${SERVER_PORT}`) )