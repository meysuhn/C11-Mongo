
// const expect = require('chai').expect;
const { expect } = require('chai'); // The same as above, but object destructured.
const mongoose = require('mongoose');
const chai = require('chai');
chai.use(require('chai-http')); // addon allows Chai library to use assertions on HTTP requests
const server = require('../src/index.js');

const should = chai.should();


describe('Test User and Course Routes', () => {
  before((done) => {
  // Connect to database.
    mongoose.connect('mongodb://localhost:27017/course_rating_api', { useNewUrlParser: true });
    const db = mongoose.connection; // represents the connection to mongodb
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
    done();
    });
  });
  // GET User with Authorisation Test
  it('it should GET all the users', (done) => {
    chai.request('http://localhost:5000')
    .get('/api/users')
    .auth('[emailAddress]', '[password]') // Insert your username and password here (without the brackets [] )
    .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        expect(res.body._id).to.equal('[Insert _id here]'); // Insert user _id here (without the brackets [] )
    done();
    });
  });
  // GET Users without Authorisation Test
  it('it should return 401 status error if not authorised.', (done) => {
    chai.request('http://localhost:5000')
    .get('/api/users')
    .end((err, res) => {
        res.should.have.status(401);
        expect(res).to.be.json;
    done();
    });
  });
  // GET All Courses Test
  it('it should GET all the courses', (done) => {
    chai.request('http://localhost:5000')
    .get('/api/courses')
    .end((err, res) => {
        res.should.have.status(200);
    done();
    });
  });
});
