
const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');
const mid = require('../middleware');

const router = express.Router();


// GET /api/users 200
// Returns the currently authenticated user
router.get('/', mid.requiresLogin, (req, res) => { // Passes request to middleware's requiresLogin function
  res.status(200).json(req.AuthorisedUser); // return the authorised user as json to the client
});


// // POST /api/users 201
// // Creates a user, sets the Location header to "/", and returns no content
router.post('/', (req, res, next) => {
    User.findOne({ emailAddress: req.body.emailAddress }).then((err, user) => {
        if (user) { // if there's an email match then error. No duplicates allowed.
            err = new Error();
            err.message = 'Email already exists in database';
            err.status = 400;
            return next(err);
        } // else
            User.create(req.body, (err, user) => {
                if (!user.emailAddress || !user.fullName || !user.password) { // if any fields missing then reject.
                  // DEBS. Did the above line come form DM or not?
                    err.status = 400;
                    return next(err);
                }
                if (err) { // Any others errors pathway
                    return next(err);
                }
                    return res.status(201).location('/').json(user); // Remove(user) before submission
            });
          // Don't put return next() to satisfy 'consistent-return' rule. It will break route.
    });
});

// ///////////////////////////////
// Extra routes (i.e. Not in the Challenge requirmenets)
// ///////////////////////////////

// Delete User
router.delete('/:userId', (req, res, next) => {
  User.findByIdAndRemove(req.params.userId, (err) => {
    console.log(req.params);
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(202).json();
  });
});


module.exports = router;
