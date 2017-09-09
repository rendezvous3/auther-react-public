'use strict';

var app = require('express')();
var path = require('path');
const session = require('express-session');
const passport = require('passport');
const User = require('../api/users/user.model');
// "Enhancing" middleware (does not send response, server-side effects only)

app.use(session({
  secret: 'twas brilling',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done)
})

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

app.use('/api', (req, res, next) => {
  if(!req.session.counter) req.session.counter = 0;
  console.log('counter: ', ++req.session.counter);
  next();
})

app.use('/api', (req, res, next) => {
  console.log('passport user:', req.user)
  console.log('session', req.session);
  next();
})


// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./statics.middleware'));

// "Error" middleware

app.use(require('../utils/HttpError')(404).middleware());

app.use(require('./error.middleware'));

module.exports = app;
