import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

chai.use(chaiHttp);
chai.should();
dotenv.config();

let accessToken;

describe('Post a car a sale ad', () => {
  it('should log a user in', (done) => {
    const data = {
      email: 'j2k4@yahoo.com',
      password: '12345678',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((err, res) => {
        accessToken = res.body.data.token;
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.data.should.have.property('token');
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should be able to post a car sale ad', (done) => {
    const data = {
      manufacturer: 'Toyota',
      model: 'camry',
      price: 300,
      state: 'new',
      status: 'available',
      body_type: 'car',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('x-access-token', accessToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to post a car sale ad when he/she is not authorized', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
// MARK POSTED AD AS SOLD TEST CASE
describe('Marking the posted car ad as sold', () => {
  it('first user should be able to post a car sale ad', (done) => {
    const data = {
      manufacturer: 'Toyota',
      model: 'camry',
      price: 400,
      state: 'new',
      status: 'available',
      body_type: 'car',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('x-access-token', accessToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should be able to mark a posted car ad as sold', (done) => {
    const status = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
      .set('x-access-token', accessToken)
      .send(status)
      .end((err, res) => {
        if (res.body.status === 200) {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
        } else {
          res.should.have.status(404);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message');
        }
        done();
      });
  });

  it('user should not be able to mark a posted car ad as sold when he/she is not authorized', (done) => {
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to mark a posted car ad as sold when the car is not in the system', (done) => {
    const status = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/100/status')
      .set('x-access-token', accessToken)
      .send(status)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message');
        done();
      });
  });
  it('user should not be able to mark a posted car ad as sold when there is a missing info', (done) => {
    chai
      .request(app)
      .patch('/api/v1/car/2/status')
      .set('x-access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to mark a posted car ad as sold when there is a wrong input data', (done) => {
    const status = {
      status: 6,
    };
    chai
      .request(app)
      .patch('/api/v1/car/2/status')
      .set('x-access-token', accessToken)
      .send(status)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
