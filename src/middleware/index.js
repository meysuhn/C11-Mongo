

const auth = require('basic-auth');
const User = require('../models/user');

function requiresLogin(req, res, next) {
  const authCredentials = auth(req); // auth is just passed the req object directly.
  // console.log('Credentials');
  // console.log(authCredentials);
  if (authCredentials) { //  if these are present then user is logged in
    User.authenticate(authCredentials.name, authCredentials.pass, (err, user) => {
      // Before the below runs the authenticate method in user schema will run.
      // console.log('Here');
      // console.log(user);
          if (err || !user) {
              err = new Error();
              err.message = 'Wrong email or password.';
              err.status = 401; // Failed authentication status code.
              return next(err);
          } // ES5 would have an 'else' here, but you've ESLINT set to 'no-else'
              req.AuthorisedUser = user; // Set the user document on the request so that each following middleware function has access to it.
              res.locals.user = user; // app.locals object has properties that are local variables within the application.
              // But why on res??
              // console.log('The Authorised User Is:');
              // console.log(req.AuthorisedUser);
              return next();
      });
  } else { // if not logged in then display error to the user.
      const err = new Error('You must be logged in to complete this action');
      err.status = 401;
      return next(err); // returned to the error handling middleware.
    }
}

module.exports.requiresLogin = requiresLogin;
