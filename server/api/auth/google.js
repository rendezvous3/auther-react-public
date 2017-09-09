const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../users/user.model');

passport.use(
    new GoogleStrategy({
        clientID: '439654475046-nskcd4e1mr6j7fnrg4u01cj4u9r1et2u.apps.googleusercontent.com',
        clientSecret: 'hNvu6oCvV0bTXZeEqN9EzMX3',
        callbackURL: '/api/auth/google/verify'
    },
    function(token, refreshToken, profile, done){
        const info = {
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos ? profile.photos[0].value : undefined
        }
        User.findOrCreate({
            where: { googleId: profile.id },
            defaults: info
        })
        .spread(user => {
            done(null, user)
        })
        .catch(done)
    })
)

// Google authentication and login 
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get('/verify',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);



module.exports = router;

