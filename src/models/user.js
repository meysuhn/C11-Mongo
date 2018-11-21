

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); // https://stackoverflow.com/questions/29320201/error-installing-bcrypt-with-npm

// _id (ObjectId) is auto-generated and so doesn't need to be declared in the model schema.

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Please enter your name',
    trim: true,
  },
  emailAddress: {
    type: String,
    required: 'Please provide your email address', // enforces response to this field
    trim: true, // removes any whitespace from beginning and end of text input
    validate: { validator: validator.isEmail, message: 'You must enter a valid email address' },
    unique: true, // ensures email address does not already appear in the database.
  },
  password: {
    type: String,
    required: 'A password is required',
  },
});


// Method to Authenticate User
// See https://teamtreehouse.com/library/authenticating-the-username-and-password

UserSchema.statics.authenticate = (email, password, callback) => {
  // console.log('THIS object line 33');
  // console.log(this);
    User.findOne({ emailAddress: email })
        .exec((err, user) => { // .exec executes the search and have a callback to process the results
          // console.log('Chris .exec');
          // console.log(user); // It's getting as far as here.
            if (err) {
              // console.log('Err 1');
                return callback(err);
            } else if (!user) { // if email address don't exist then error
              // console.log('Err 2');
                err = new Error();
                err.message = 'User not found (no account matches that email address)';
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (err, result) => { // compare supplied password with hashed version
              // 1st argument is user supplied password. 2nd argument is password stored in db.
              // console.log('User supplied password:');
              // console.log(password);
              // console.log('Database password:');
              // console.log(user.password);
              // console.log('Hi from Bcrypt');
                if (result === true) { // compare method simply returns true if there's a match, and false if not.
                  // console.log('Hello2');
                    // console.log(user);
                    return callback(null, user); // return the authorised user back to middlware
                      // null represents an error value. Node's standard pattern for callbackas is (error, argument1, argument 2 etc)
                      // As there's no error in this case we pass null to that parameter.
                }
                  // console.log('This error is firing');
                    return callback();
            });
        });
};

// USE ES6 BUT THEN USE A COMPILER LIKE WEBPACK OR BABEL. GOOD PRACTICE.

// Below not written with arrow functions as they mess with 'this' context:
  // https://stackoverflow.com/questions/33774472/mongoose-pre-save-is-using-incorrect-this-context
UserSchema.pre('save', function(next) {
  console.log(this);
    let user = this;
    console.log('Schema hook user');
    console.log(user);
    console.log('Schema hook');
    console.log(this);
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
});

// // For hashing password just before storing new user record in the db
// UserSchema.pre('save', (next) => { // anonymous function is second argument passed to this method/hook
//    // A pre save hook is a function Mongoose runs just before saving a record to Mongo.
//    // Here we are hashing the new password just before saving it in the database.
//    // 'Save' is a Mongoose keyword, instructing Mongoose to run the function before saving to Mongo.
//   const user = this; // Mongoose assigns object it is about to insert in the db to the JS keyword 'this'
//   console.log('Schema hook user');
//   console.log(user);
//   console.log('Schema hook');
//   console.log(this);
//     // here 'this' holds the user object and its data.
//     bcrypt.hash(user.password, 10, (err, hash) => { // this hash method creates a hash and a salt in the one function call
//       // user contains document that Mongoose will insert into Mongo
//         // .password property holds the plain text password provided by the user
//       // 10 tells bcrypt to apply encryption algo 10 times.
//       // The callback. Bcrypt will run the callback after the password is hashed.
//       if (err) {
//         return next(err); // pass error to our global error handler.
//       }
//       user.password = hash; // if no error then assign hashed value to password property of the user object
//         // i.e. overwrite the plain text password with the new secure hash.
//       next(); // Call 'next' to call the next function in the middleware stack.
//     });
// });

// 'const User' holds the model defined above.
// ('name of the model', the schema that defines it (i.e. the UserSchema declared in the above constructor))
// Mongoose will pluralise the name 'User' to 'Users', which will map to a 'Users' collection in the mongodb database.
const User = mongoose.model('User', UserSchema);
module.exports = User;
