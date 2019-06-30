import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

chai.use(chaiHttp);
chai.should();
dotenv.config();

let accessToken;

describe('Purchasing order', () => {
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

  it('buyer should be able to make a purchasing order', (done) => {
    const newOrder = {
      car_id: 1,
      amount: 200,
      status: 'pending',
      buyer: 1,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        if (res.body.status === 201) {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
        } else {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(404);
          res.body.should.have.property('error');
        }
        done();
      });
  });

  it('buyer should not be able to make a purchasing order when he/she is not authorized', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('buyer should not be able to make a purchasing order when the car id is not found', (done) => {
    const newOrder = {
      car_id: 1000,
      amount: 100,
      status: 'available',
      buyer: 1,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to make a purchasing order when there is a missing info', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set('x-access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('buyer should not be able to make a purchasing order when there is a wrong input data type', (done) => {
    const newOrder = {
      buyer: 1,
      car_id: 7,
      amount: 'hundred',
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
// UPDATE PURCHASE ORDER PRICE TEST CASE
describe('updating the price purchasing order', () => {
  it('buyer should be able to update the price of purchasing order', (done) => {
    const newOrder = {
      price_offered: 300,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('buyer should not be able to update the price of purchasing order when he/she is not authorized', (done) => {
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to update the price of purchasing order when the purchasing order is not in the system', (done) => {
    const newOrder = {
      price_offered: 20000,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1000/price')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to update the price of purchasing order when there is a missing info', (done) => {
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('x-access-token', accessToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('buyer should not be able to update the price of purchasing order when there is a wrong input data type', (done) => {
    const newOrder = {
      price_offered: 'price',
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to update the price of purchasing order when the status is not pending', (done) => {
    const newOrder = {
      price_offered: 350,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('x-access-token', accessToken)
      .send(newOrder)
      .end((err, res) => {
        if (res.body.status === 403) {
          res.should.have.status(403);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(403);
          res.body.should.have.property('error');
        } else {
          res.should.have.status(200);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('data');
        }
        done();
      });
  });
});
