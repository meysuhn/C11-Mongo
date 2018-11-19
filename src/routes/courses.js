
const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');

const router = express.Router();


// GET /api/courses 200
  // Returns the Course "_id" and "title" properties
router.get('/', (req, res, next) => {
  Course.find({}, 'course_id title', (err, courses) => {
    if (err) {
      err.status = 400; // 400 Bad Request response status code indicates that the server could not understand the request due to invalid syntax.
      return next(err);
    } // else (no longer needs to be stated)
    return res.status(200).json(courses);
  });
});


// GET /api/course/:courseId 200
  // Returns all Course properties and related documents for the provided course ID
router.get('/:courseId', (req, res, next) => {
  Course.findById(req.params.courseId, (err, course) => { // find course by id (using Express's params)
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(200).json(course);
  });
});


// POST /api/courses 201
  // Creates a course, sets the Location header, and returns no content
router.post('/', (req, res, next) => {
  Course.create(req.body, (err) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(201).location('/').json(); // Returns no content
  });
});


// Updates (edits) a course and returns no content
// PUT /api/courses/:courseId 204
router.put('/:courseId', (req, res, next) => {
  Course.findByIdAndUpdate(req.params.courseId, req.body, (err) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    return res.status(204).json();
  });
});


// POST /api/courses/:courseId/reviews 201
  // Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post('/:courseId/reviews', (req, res, next) => {
   // How to get an auto date??
   // Need to associate this with a user and course at submission.
  Review.create(req.body, (err) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    return res.location('/').status(201).json({
      response: 'Hi Chris',
      courseID: req.params.courseId, // this is from the route!
      body: req.body,
    }); // Should return no content. Remove json once complete.
  });
});

// ///////////////////////////////
// Extra routes (i.e. Not in the Challenge requirmenets)
// ///////////////////////////////


// GET Reviews
// The reviews exist in the Reviews Collection but you're searching on Course collection?
router.get('/:courseId/reviews', (req, res, next) => {
  Course.findById(req.params.courseId, (err, course) => { // find reviews by id (using Express's params)
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(200).json(course.reviews);
  });
});


// GET Steps
// The steps exist in the Course Collection
router.get('/:courseId/steps', (req, res, next) => {
  Course.findById(req.params.courseId, (err, course) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(200).json(course.steps);
  });
});


// Delete Course
router.delete('/:courseId', (req, res, next) => {
  Course.findByIdAndRemove(req.params.courseId, (err) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(202).json();
  });
});


module.exports = router;
