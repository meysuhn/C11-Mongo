
const express = require('express');
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');
const mid = require('../middleware');

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
  // populate returns related documents, not only the ids.
router.get('/:courseId', (req, res, next) => {
  Course.findById(req.params.courseId)
    .populate('user', 'fullName') // 2nd param means only the fullName on the user document will be returned.
    .populate('reviews')
    .exec((err, course) => { // find course by id (using Express's params)
    if (err) {
      err.status = 400;
      return next(err);
    }
  return res.status(200).json(course);
  });
});


// POST /api/courses 201
  // Creates a course, sets the Location header, and returns no content
router.post('/', mid.requiresLogin, (req, res, next) => {
  req.body.user = res.locals.user._id; // add authorised user id to new course body
  Course.create(req.body, (err) => {
    if (err) {
      err.status = 400; // will fire if Mongoose validation fails, passing to Express Global Error Handler
      return next(err);
    }
  return res.status(201).location('/').json(); // Returns no content
  });
});


// Updates (edits) a course and returns no content
// PUT /api/courses/:courseId 204
router.put('/:courseId', mid.requiresLogin, (req, res, next) => {
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
router.post('/:courseId/reviews', mid.requiresLogin, (req, res, next) => {
  Course.findById({ _id: req.params.courseId })
    .populate('user')
    .exec((err, course) => {
        if (err) {
            err.status = 400;
            return next(err);
        }
        if (course.user._id.toString() === res.locals.user._id.toString()) {
            const err = new Error();
            err.message = 'Sorry, you\'re unable to review your own course';
            err.status = 400;
            return next(err);
        }
        // Create the Review object
        Review.create(req.body, (err, review) => {
           if (err) {
             err.status = 400;
             return next(err);
           } // else
           Course.updateOne( // push the new review id on to the courses reviews array
             // you'd previously used findOneAndUpdate, but updateOne works fine too.
              { _id: req.params.courseId }, // the associated couse id, taken from the url
              { $push: { reviews: review._id } }, // the new review's id
              (err, course) => { // course is a necessary callback parameter for this method. Not sure how to satisfy no-unused-var rule though
                if (err) {
                  err.status = 400;
                  return next(err);
                }
              },
            ); // end of updateOne
           return res.location('/:courseId').status(201).json({
             review, // shorthand
           });
        }); // end of Review.Create
    }); // end of .exec
});


// ///////////////////////////////
// Extra routes (i.e. Not in the Challenge requirmenets)
// ///////////////////////////////


// GET Reviews
// The reviews exist in the Reviews Collection. Only the review IDs exist in the course collection
 // Only the review IDs are returned (as 'populate' hasn't been used)
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
  // Steps exist in the documents of each course and don't have their own model.
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
