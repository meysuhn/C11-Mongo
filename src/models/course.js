const mongoose = require('mongoose');

// _id (ObjectId) is auto-generated and so doesn't need to be declared in the model schema.

const CourseSchema = new mongoose.Schema({
  user: { // _id from the users collection
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: 'A course title must be provided',
    trim: true,
  },
  description: {
    type: String,
    required: 'Please provide a course description',
    trim: true,
  },
  estimatedTime: {
    type: String,
    trim: true,
  },
  materialsNeeded: {
    type: String,
    trim: true,
  },
  steps: [{
    stepNumber: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  }],
  reviews: [{ // (Array of ObjectId values, _id values from the reviews collection)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
