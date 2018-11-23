# Build a Course Rating API With Express
## FullStack Tech Degree Project 11

### Mongodb, Node, Express, Mongoose

### Running the app

##### (1) Install dependencies
`npm install`

##### (2) Seed the database
In the command line navigate to `/seed-data` and run the following two commands, which will seed the Courses and Reviews collections to the project's course_rating_api db:

`mongoimport --db course_rating_api --collection courses --type=json --jsonArray --file courses.json`<br/>
`mongoimport --db course_rating_api --collection courses --file courses.json --jsonArray`

##### (3) Run the application
`npm start` or `nodemon`

##### (4) Create a user:
As no users have been supplied one will need to be created to use the app.
Complete the json fields below and POST in the body Postman field to: `http://localhost:5000/api/users/`<br/>
```json
{
    "fullName": "",
    "emailAddress": "",
    "password": ""
}
```

### Running the tests
(1) Get your newly created user's id from the `http://localhost:5000/api/users/` route<br/>
(2) Close the dev server<br/>
(3) Add in your newly created user's credentials to `test/tests.js` as follows:<br/>
 \- Line 26 `.auth('[emailAddress]', '[password]')`<br/>
 \- Line 30 `expect(res.body._id).to.equal('[Insert _id here]');`<br/>
(4) Run `npm test`
