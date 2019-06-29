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
