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

// ReviewSchema.pre('validate', function (res, next) {
//   // get user id (this.user)
//   console.log('this user');
//   console.log(this.user);
//
//   console.log('this _id, the newly created reviews id');
//   console.log(this._id);
//   // get course id
//   // where to get course id from?
//   // you've then got to get the user who created that course!
// console.log(res.locals);
//   // compare them
//
//     // if (this.startDate > this.endDate) {
//     //     next(new Error('End Date must be greater than Start Date'));
//     // }
//     //   if (err) return next(err);
//     next();
// });

// UserSchema.pre('save', function(next) {
//   console.log(this);
//     let user = this;
//     console.log('Schema hook user');
//     console.log(user);
//     console.log('Schema hook');
//     console.log(this);
//     bcrypt.hash(user.password, 10, function(err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next();
//     })
// });

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
