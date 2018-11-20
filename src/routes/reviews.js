const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');
const mid = require('../middleware');

const router = express.Router();

// GET Reviews 2
  // Returns the Course "_id" and "title" properties
router.get('/', (req, res, next) => {
  Review.find({}, 'review user', (err, reviews) => {
    if (err) {
      err.status = 400; // 400 Bad Request response status code indicates that the server could not understand the request due to invalid syntax.
      return next(err);
    } // else (no longer needs to be stated)
    return res.status(200).json(reviews);
  });
});

module.exports = router;
