
const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');
const mid = require('../middleware');

const router = express.Router();

// USER ROUTES

// Returns the currently authenticated user
// GET /api/users 200
router.get('/', mid.requiresLogin, (req, res) => { // Passes request to middleware's requiresLogin function
  res.json(req.AuthorisedUser); // return the authorised user as json to the client
  res.status(200);
  console.log('success');
  // return res.render('secret', { title: 'Top secret. Stay out!' });
});


// // Creates a user, sets the Location header to "/", and returns no content
// // POST /api/users 201
router.post('/', (req, res, next) => {
  console.log('Initial req.body');
  console.log(req.body);
    User.findOne({ emailAddress: req.body.emailAddress }).then((err, user) => {
      console.log('.exec User');
      console.log(user); // It's NULL here!
        if (user) { // if there's an email match then error. No duplicates allowed.
            err = new Error();
            err.message = 'Email already exists in database';
            err.status = 400;
            return next(err);
        } // else
            User.create(req.body, (err, user) => {
                if (!user.emailAddress || !user.fullName || !user.password) { // if any fields missing then reject.
                  // DEBS. Did the above line come form DM or not?
                  console.log('Chris Successfully Created');
                  console.log(user);
                    err.status = 400;
                    return next(err);
                }
                if (err) { // Any others errors pathway
                    return next(err);
                }
                    res.location('/');
                    // res.status(201).json();  //returns no content
                      // Chris: Can't call .sjon twice. Will error. Commented out whilst practising.
                    res.status(201); // Returns no content
                    res.json(user); // The instructions don't want this. For tuition only.
            });
            console.log('.exec 2 User');
            console.log(user); // It's NULL here!
    }); // Check new email address (req.body...) against existing email addresses.
});


// // // Creates a user, sets the Location header to "/", and returns no content
// // // POST /api/users 201
// router.post('/', (req, res, next) => {
//   console.log('Initial req.body');
//   console.log(req.body);
//     User.findOne({ emailAddress: req.body.emailAddress }) // Check new email address (req.body...) against existing email addresses.
//         .exec((err, user) => {
//           console.log('.exec User');
//           console.log(user); // It's NULL here!
//             if (user) { // if there's an email match then error. No duplicates allowed.
//                 err = new Error();
//                 err.message = 'Email already exists in database';
//                 err.status = 400;
//                 return next(err);
//             } // else
//                 User.create(req.body, (err, user) => {
//                     if (!user.emailAddress || !user.fullName || !user.password) { // if any fields missing then reject.
//                       // DEBS. Did the above line come form DM or not?
//                       console.log('Chris Successfully Created');
//                       console.log(user);
//                         err.status = 400;
//                         return next(err);
//                     }
//                     if (err) { // Any others errors pathway
//                         return next(err);
//                     }
//                         res.location('/');
//                         // res.status(201).json();  //returns no content
//                           // Chris: Can't call .sjon twice. Will error. Commented out whilst practising.
//                         res.status(201); // Returns no content
//                         res.json(user); // The instructions don't want this. For tuition only.
//                 });
//                 console.log('.exec 2 User');
//                 console.log(user); // It's NULL here!
//         });
// });


// router.post('/', (req, res) => {
//   // check email address doesn't already exhist
//   // Exec Mongoose Promise Function
//     // https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do
//
//     // if email exists new error
//     // else create new user
//       // if any key info missing then return error
//       // if any other err then return error
//       // else complete job
//
//   res.json({
//     response: 'You sent me a POST request',
//     body: req.body,
//   });
// });


module.exports = router;
