import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
chai.should();

describe('signup', () => {
  it('user should be able to signup', (done) => {
    const user = {
      first_name: 'John',
      last_name: 'Champion',
      email: 'j2k4@yahoo.com',
      password: '12345678',
      address: 'kings way avenue',
      is_admin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        if (res.body.status === 201) {
          res.should.have.status(201);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(201);
          res.body.should.have.property('data');
        } else {
          res.should.have.status(403);
          res.should.be.an('object');
          res.body.should.have.property('status').eql(403);
          res.body.should.have.property('error');
        }
        done();
      });
  });

  it('user should not be able to signup when there is incorrect data type', (done) => {
    const user = {
      first_name: 3,
      last_name: 'Champion',
      email: 'j2k4@yahoo.com',
      password: '12345678',
      address: 'kings way avenue',
      is_admin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when the email is already registered', (done) => {
    const user = {
      email: 'j2k4@yahoo.com',
      first_name: 'Jon',
      last_name: 'Champion',
      password: '12345678',
      address: 'kings way avenue',
      is_admin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(403);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to signup when email is not entered', (done) => {
    const user = {
      first_name: 'Jon',
      last_name: 'Champion',
      password: '12345678',
      address: 'kings way avenue',
      is_admin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
  it('user should not be able to signup when there is an empty field', (done) => {
    const user = {
      first_name: 'Jon',
      last_name: 'Champion',
      email: '',
      password: '12345678',
      address: 'kings way avenue',
      is_admin: false,
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});

// sign in tests case
describe('login', () => {
  it('user should be able to login', (done) => {
    const user = {
      email: 'j2k4@yahoo.com',
      password: '12345678',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('user should not be able to login when there is incorrect data type', (done) => {
    const user = {
      email: 2,
      password: '12345678',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to login when the email is not registered', (done) => {
    const user = {
      email: 'avengers@yahoo.com',
      password: '12345678',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to login when there is an empty field', (done) => {
    const user = {
      email: '',
      password: '12345678',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });

  it('user should not be able to login when the password is incorrect', (done) => {
    const user = {
      email: 'j2k4@yahoo.com',
      password: 'ad57478',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.an('object');
        res.body.should.have.property('status').eql(400);
        res.body.should.have.property('error');
        done();
      });
  });
});
