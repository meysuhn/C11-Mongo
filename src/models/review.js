const mongoose = require('mongoose');

// _id (ObjectId) is auto-generated and so doesn't need to be declared in the model schema.

const ReviewSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  user: { // _id from the users collection
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  rating: { //  must fall between “1” and “5”
    type: Number,
    required: 'Please provide a rating between 1 to 5',
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    trim: true,
  },
});


const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
