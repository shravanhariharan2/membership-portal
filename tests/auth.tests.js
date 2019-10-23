/* eslint-disable prefer-arrow-callback */
const request = require('supertest');
const { server } = require('../index.js');
// Clean case with a valid input of a user already in the Database
describe('POST /api/v1/auth/login', function () {
  it('Tests if a user already in the database is able to login', function (done) {
    request(server)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({email: 'jrpadua@ucsd.edu', password: 'password'})
      .expect('Content-Type', /json/)
      .expect(function (res) {
        res.body.email = 'jrpadua@ucsd.edu';
        res.body.password = 'password';
      })
      .expect(200, {
        email: 'jrpadua@ucsd.edu',
        password: 'password'
      }
      , done);
  });
});
// Dirty case of an invalid input of a user not in the database
describe('POST /api/v1/auth/login', function () {
  it('Tests if a user not in the database is able to login', function (done) {
    request(server)
      .post('/api/v1/auth/login')
      .set('Accept', 'application/json')
      .send({email: 'student1@ucsd.edu', password: 'password'})
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});
// Clean case of a user registering with all of the required fieldds
describe('POST /api/v1/auth/register', function () {
  it('user.name should be an case-insensitive match for "john"', function (done) {
    request(server)
      .post('/api/v1/auth/register')
      .send({ 
        user: {
          email: 'jrpadua@ucsd.edu',
          firstName: 'Jaden',
          lastName:  'Padua',
          password: 'password',
          graduationYear: '2022',
          major: 'Computer Science'
        }
      })
      .set('Accept', 'application/json')
      .expect(function (res) {
        res.body.user.email = 'jrpadua@ucsd.edu';
        res.body.user.firstName = 'Jaden';
        res.body.user.lastName = 'Padua';
        res.body.user.password = 'password';
        res.body.user.graduationYear = '2022';
        res.body.user.major = 'Computer Science';
      })
      .expect(200, {
        user.email: 'jrpadua@ucsd.edu',
        user.firstName: 'Jaden',
        user.lastName: 'Padua',
        user.password: 'password',
        user.graduationYear: '2022',
        user.major: 'Computer Science'
      } , done);
  });
});
// Dirty case of an invalid input to register, only username and password as input
describe('POST /api.v1/auth', function () {
  it('Test for if a user is able to register', function (done) {
    request(server)
      .post('/api/v1/auth/register')
      .set('Accept', 'application/json')
      .send({user: 'jrpadua@ucsd.edu', password: 'password'})
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});
