import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('View all unsold cars', () => {
  it('user should be able to view all unsold cars', (done) => {
    chai
      .request(app)
      .get('/api/v1/available')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('View new unsold cars', () => {
  it('user should be able to view new unsold cars', (done) => {
    chai
      .request(app)
      .get('/api/v1/available/new')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});

describe('View a specific car', () => {
  it('user should be able to view a specific car', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to view a specific car when the car is not in the database', (done) => {
    chai
      .request(app)
      .get('/api/v1/car/7')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});

describe('View all unsold cars within a price  range', () => {
  it('user should be able to view all unsold cars within a price  range', (done) => {
    const price = {
      min_price: 50,
      max_price: 200,
    };
    chai
      .request(app)
      .get('/api/v1/available/range')
      .send(price)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to view all unsold cars within a price range when the price range does not exist', (done) => {
    const price = {
      min_price: 350,
      max_price: 500,
    };
    chai
      .request(app)
      .get('/api/v1/available/range')
      .send(price)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to view all unsold cars within a price range when range is not specified', (done) => {
    chai
      .request(app)
      .get('/api/v1/available/range')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        done();
      });
  });
});

describe('View used unsold cars', () => {
  it('user should be able to view used unsold cars', (done) => {
    chai
      .request(app)
      .get('/api/v1/available/used')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });
});
