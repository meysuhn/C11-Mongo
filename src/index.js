const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json; // a function that will return middleware that we can add to our app
const mongoose = require('mongoose');
const courses = require('./routes/courses');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

const app = express();


/*---------------------------------------------------------------------
Friendly greeting for the root route (localhost:5000/)
----------------------------------------------------------------------*/
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API.',
    text: 'To view full course details and leave a review please sign in:',
  });
});

/*---------------------------------------------------------------------
MIDDLEWARE
----------------------------------------------------------------------*/

// morgan gives us http request logging
app.use(morgan('dev'));

// Middleware to accept json data coming into our routes.
// When the app receives a request this middleware will parse request's body as json and make it accessible from req.body property.
app.use(jsonParser());

// Set up base root paths ('/LOCATION HEADER', MODULE NAME)
// i.e. here I'm saying to access any route in the routes module each URL needs to be prefaced with 'api'
app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/api/reviews', reviews);
// NOTE later try removing 'users' and 'courses' here and adding them instead directly onto the route declarations


/*---------------------------------------------------------------------
ERROR HANDLING
----------------------------------------------------------------------*/

// send 404 if no other route matched
// NOTE // this is slightly different to how AC sets his up. Why?
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// global error handler
app.use((err, req, res, next) => { // 1st param is an error object.
  console.error('Express Global Error Handler Fired');
  // console.error(err.stack);
  return res.status(err.status || 500).json({ // if err object has status propery then use that, if not then set 500.
    message: err.message,
    error: {},
    status: err.status,
  }); // error is sent to the client as json.
});


/*---------------------------------------------------------------------
DATABASE CONNECTION
----------------------------------------------------------------------*/

// Connect to Mongo db with Mongoose
  // ('connect to mongodb on localhost 27017, the default port for mongodb')
  // course_rating_api is the name of the mongo data store, the name of the databse for my site.
mongoose.connect('mongodb://localhost:27017/course_rating_api', { useNewUrlParser: true });

const db = mongoose.connection; // represents the connection to mongodb

// Mongo Error Handler
  // mongoose's 'on' method listens for the error event.
  // 'on' fires its handler every time an event occurs (i.e. constantly listening)
db.on('error', console.error.bind(console, 'connection error:'));

// This event emitted when connection to Mongodb server open and ready to go.
  // 'once' only fires its handler the first time an event occurs.
db.once('open', () => {
  console.log('Connected successfully to db: course_rating_api');

  // NOTE What about 'save'?
  // https://teamtreehouse.com/library/connecting-mongoose-to-mongodb

  // db.close(() => { console.log('DB Closed'); }); // close connection when communication finished.
});


/*---------------------------------------------------------------------
 SERVER PORT
----------------------------------------------------------------------*/

// set our port
app.set('port', process.env.PORT || 5000); // will display on localhost 5000 unless on a production environment

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

// module.exports = server;
