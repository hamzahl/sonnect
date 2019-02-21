process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const mongoose = require('mongoose');
const User = require('../api/models/User');

chai.use(chaiHttp);


/* 
  REGISTER ROUTE TESTING
*/

const testUser = {
  email: "hamzah_97@hotmail.com",
  password: "letmein1"
}

describe('POST api/users/register', () => {
  it('it should return an object', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send(testUser)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
  it('it should return an status code of 200', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


// describe('POST api/users/register', () => {
//   it('it should return a status code of 202', (done) => {
//     chai.request(server)
//       .post('/api/users/register')
//       .send(testUser)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });