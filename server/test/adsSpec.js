import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('Post a car a sale ad', () => {
  it('user should be able to post a car sale ad', (done) => {
    const carAd = {
      owner: 1,
      email: 'j2k4@yahoo.com',
      manufacturer: 'Toyota',
      model: 'camry',
      price: 100,
      state: 'new',
      status: 'sold',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(201);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to post a car sale ad when the owner id is not found', (done) => {
    const carAd = {
      owner: 7,
      email: 'obembewawa@yahoo.com',
      manufacturer: 'Toyota',
      model: 'camry',
      price: 100,
      state: 'new',
      status: 'available',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when there is a missing info', (done) => {
    const carAd = {
      email: 'j2k4@yahoo.com',
      manufacturer: 'Toyota',
      model: 'camry',
      price: 100,
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when there is an empty info', (done) => {
    const carAd = {
      owner: 1,
      email: '',
      manufacturer: 'Toyota',
      model: 'camry',
      price: 100,
      state: 'new',
      status: 'sold',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to post a car sale ad when there is a wrong input data type', (done) => {
    const carAd = {
      owner: 1,
      email: 'j2k4@yahoo.com',
      manufacturer: 45,
      model: 'camry',
      price: 100,
      state: 'new',
      status: 'sold',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(carAd)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

// MARK AD AS SOLD TESTS CASE
describe('Marking the posted car ad as sold', () => {
  it('user should be able to mark a posted car ad as sold', (done) => {
    const status = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/2/status')
      .send(status)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to mark a posted car ad as sold when the car is not in the system', (done) => {
    const status = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/9/status')
      .send(status)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to mark a posted car ad as sold when there is a missing info', (done) => {
    const status = {
      status: '',
    };
    chai
      .request(app)
      .patch('/api/v1/car/2/status')
      .send(status)
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
      .send(status)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to mark a posted car ad as sold for cars that are sold', (done) => {
    const status = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
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

// UPDATING THE PRICE OF POSTED AD TEST CASE
describe('updating the price posted car ad', () => {
  it('user should be able to update the price of posted car ad', (done) => {
    const newOrder = {
      price: 200,
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/price')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('seller should not be able to update the price of posted car ad when there is wrong input or missing input', (done) => {
    chai
      .request(app)
      .patch('/api/v1/car/1/price')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('seller should not be able to update the price of posted car ad when the car id is not found', (done) => {
    const newOrder = {
      price: 20000,
    };
    chai
      .request(app)
      .patch('/api/v1/car/7/price')
      .send(newOrder)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});

// Delete AD TESTS CASE
describe('Delete a posted car ad', () => {
  it('user should be able to delete posted car ad', (done) => {
    const id = 1;
    chai
      .request(app)
      .delete(`/api/v1/car/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to delete posted car ad', (done) => {
    const id = 7;
    chai
      .request(app)
      .delete(`/api/v1/car/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });
});
