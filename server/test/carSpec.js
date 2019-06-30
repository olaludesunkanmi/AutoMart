import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

chai.use(chaiHttp);
chai.should();
dotenv.config();

let accessToken;

describe('Viewing all unsold cars', () => {
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
  it('user should be able to view all unsold cars', (done) => {
    const value = {
      status: 'available',
    };
    chai
      .request(app)
      .get('/api/v1/available')
      .set('x-access-token', accessToken)
      .send(value)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});
describe('View used unsold cars', () => {
  it('user should be able to view used unsold cars', (done) => {
    const value = {
      status: 'available',
      state: 'used',
    };
    chai
      .request(app)
      .get('/api/v1/available/used')
      .set('x-access-token', accessToken)
      .send(value)
      .end((err, res) => {
        if (res.body.status === 200) {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
        } else {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('message');
        }
        done();
      });
  });
});

describe('Viewing a specific car', () => {
  it('user should be able to view a specific car', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/1')
      .set('x-access-token', accessToken)
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

  it('user should not be able to view a specific car when he is not authorized', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/1')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to view a specific car when the car is not in the system', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/1000')
      .set('x-access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('View all unsold cars within a price  range', () => {
  it('user should be able to view all unsold cars within a price range', (done) => {
    const range = {
      min_price: 50,
      max_price: 1000,
      status: 'available',
    };
    chai
      .request(app)
      .get('/api/v1/available/range')
      .set('x-access-token', accessToken)
      .send(range)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to view all unsold cars within a price range when there is none', (done) => {
    const range = {
      min_price: 0,
      max_price: 0,
      status: 'available',
    };
    chai
      .request(app)
      .get('/api/v1/available/range')
      .set('x-access-token', accessToken)
      .send(range)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('message');
        done();
      });
  });

  it('user should not be able to view all unsold cars within a price range when not specified', (done) => {
    chai
      .request(app)
      .get('/api/v1/available/range')
      .set('x-access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
