
const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');

const router = express.Router();


// Returns the Course "_id" and "title" properties
// GET /api/courses 200
router.get('/', (req, res, next) => {
  Course.find({}, 'course_id title', (err, courses) => {
    if (err) {
      err.status = 400; // 400 Bad Request response status code indicates that the server could not understand the request due to invalid syntax.
      console.log('Error');
      return next(err);
    }
    res.status(200);
    res.json(courses);
    // res.json({ response: 'You sent me a GET request' });
  });
});


// Returns all Course properties and related documents for the provided course ID
// GET /api/course/:courseId 200
// When returning a single course for the GET /api/courses/:courseId route, use Mongoose population to load the related user and reviews documents.
router.get('/:courseId', (req, res, next) => {
  console.log('Course ID middleware, ID:', req.params.courseId);
  res.json({
    response: `You sent me a GET request for ID ${req.params.courseId}`,
  });
  // find course by id (using Express's params)
    // if err return error
    // else return data
});

// Creates a course, sets the Location header, and returns no content
// POST /api/courses 201
router.post('/courses', (req, res, next) => {
  // require sign in middleware (See DM)
  // Create course
    // if err return error
    // else create new user
  return res.status(201); // Not sure if this is correct or not. It was from memory.
});


// Updates (edits) a course and returns no content
// PUT /api/courses/:courseId 204
router.put('/courses/:courseId', (req, res, next) => {
  // Require sign in middleware
  // findByIdAndUpdate Method?
    // if err return error
    // else create new user
  res.json({
    response: `You sent me a PUT request to ID ${req.params.courseId} /reviews`,
    courseId: req.params.courseId,
    body: req.body,
  });
});


// Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
// POST /api/courses/:courseId/reviews 201
// NOTE do you want each review to also have its own ID?
router.post('/courses/:courseId/reviews', (req, res, next) => {
  res.json({
    response: `You sent me a POST request to ID ${req.params.courseId} /reviews`,
    courseId: req.params.courseId,
    body: req.body,
  });
});

// NOTE if you later want to add a delete route (outside of requirements)
// https://teamtreehouse.com/library/building-the-answer-routes
// also the above if you want to add a 'was this review helpful'feature

module.exports = router;
