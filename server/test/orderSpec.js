import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Purchase order', () => {
  it('buyer should be able to make a purchasing order', (done) => {
    const newOrder = {
      buyer: 1,
      car_id: 1,
      amount: 150,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });
  it('buyer should not be able to make a purchasing order when he/she is not in the database', (done) => {
    const newOrder = {
      buyer: 7,
      car_id: 1,
      amount: 180,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('buyer should not be able to make a purchasing order when the car id is not found', (done) => {
    const newOrder = {
      buyer: 1,
      car_id: 7,
      amount: 100,
    };
    chai
      .request(app)
      .post('/api/v1/order')
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
      car_id: 2,
      amount: 'lol',
    };
    chai
      .request(app)
      .post('/api/v1/order')
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

// UPDATE PURCHASE ORDER TEST CASE
describe('update the price of purchase order', () => {
  it('buyer should be able to update the price of purchase order', (done) => {
    const newOrder = {
      price_offered: 150,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('buyer should not be able to update the price of purchase order when the purchase order is not in the database', (done) => {
    const newOrder = {
      price_offered: 100,
    };
    chai
      .request(app)
      .patch('/api/v1/order/7/price')
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
      .patch('/api/v1/order/2/price')
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
      price_offered: 'lol',
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
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
      price_offered: 200,
    };
    chai
      .request(app)
      .patch('/api/v1/order/2/price')
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
