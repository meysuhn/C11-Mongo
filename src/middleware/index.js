

const auth = require('basic-auth');
const User = require('../models/user');

function requiresLogin(req, res, next) {
  const credentials = auth(req); // auth is just passed the req object directly.
  console.log('Credentials');
  console.log(credentials);
  if (credentials) { //  if these are present then user is logged in
    User.authenticate(credentials.name, credentials.pass, (err, user) => {
      // Before the below runs the authenticate method in user schema will run.
      console.log('Here');
      console.log(user);
          if (err || !user) {
              err = new Error();
              err.message = 'Wrong email or password.';
              err.status = 401; // Failed authentication status code.
              return next(err);
          } // ES5 would have an 'else' here, but you've ESLINT set to 'no-else'
              req.AuthorisedUser = user; // SUCCESS
              return next();
      });
  } else { // if not logged in then display error to the user.
      const err = new Error('You must be logged in to view this page.');
      err.status = 401;
      return next(err); // returned to the error handling middleware.
    }
}

module.exports.requiresLogin = requiresLogin;
