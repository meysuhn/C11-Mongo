
const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');
const mid = require('../middleware');

const router = express.Router();

// USER ROUTES

// Returns the currently authenticated user
// GET /api/users 200
router.get('/', mid.requiresLogin, (req, res) => {
  res.json(req.AuthorisedUser);
  res.status(200);
  // return res.render('secret', { title: 'Top secret. Stay out!' });
});


// Creates a user, sets the Location header to "/", and returns no content
// POST /api/users 201
router.post('/', (req, res) => {
  // check email address doesn't already exhist
  // Exec Mongoose Promise Function
    // https://stackoverflow.com/questions/31549857/mongoose-what-does-the-exec-function-do

    // if email exists new error
    // else create new user
      // if any key info missing then return error
      // if any other err then return error
      // else complete job

  res.json({
    response: 'You sent me a POST request',
    body: req.body,
  });
});


module.exports = router;
