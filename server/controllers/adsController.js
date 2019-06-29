/* eslint-disable camelcase */
import ads from '../models/adsDb';
import cars from '../models/carsDb';
import db from '../config/index';

class AdsController {
  // post a car ad
  static async postAd(req, res) {
    try {
      const {
        manufacturer, model, price, state, status,
      } = req.body;
      const created_on = new Date().toUTCString();
      const body_type = req.body.body_type || 'car';
      const owner = req.user.id;
      const insertCar = 'INSERT INTO cars(owner, created_on, state, status, price, manufacturer, model, body_type) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
      const results = await db.query(insertCar, [
        owner,
        created_on,
        state,
        status,
        price,
        manufacturer,
        model,
        body_type,
      ]);
      res.status(201).json({
        status: 201,
        data: {
          id: results.rows[0].id,
          created_on,
          email: req.user.email,
          manufacturer,
          model,
          price,
          state,
          status,
        },
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  static markPostedAd(req, res) {
    const carId = req.params.id;
    const carIndex = ads.findIndex(o => o.id === parseInt(carId, 10));
    if (carIndex > -1) {
      const originalCar = ads[carIndex];
      if (originalCar.status !== 'available') {
        res.status(400).json({
          status: 400,
          error: 'you can not change the status of this car',
        });
        return;
      }
      const newCarStatus = {
        id: originalCar.id,
        email: originalCar.email,
        createdOn: new Date().toUTCString(),
        manufacturer: originalCar.manufacturer,
        model: originalCar.model,
        price: originalCar.price,
        state: originalCar.state,
        status: req.body.status,
      };
      ads[carIndex] = {
        id: originalCar.id,
        owner: originalCar.owner,
        createdOn: newCarStatus.createdOn,
        manufacturer: originalCar.manufacturer,
        model: originalCar.model,
        price: originalCar.price,
        state: originalCar.state,
        status: newCarStatus.status,
      };
      res.status(200).json({
        status: 200,
        data: newCarStatus,
      });
      return;
    }
    res.status(404).json({
      status: 404,
      error: 'car post not found',
    });
  }

  static updatePostedAdPrice(req, res) {
    const carId = req.params.id;
    const carIndex = cars.findIndex(o => o.id === parseInt(carId, 10));
    if (carIndex > -1) {
      const originalCar = cars[carIndex];
      const newCar = {
        id: originalCar.id,
        owner: originalCar.owner,
        createdOn: new Date().toUTCString(),
        state: originalCar.state,
        status: originalCar.status,
        price: req.body.price,
        manufacturer: originalCar.manufacturer,
        model: originalCar.model,
        body_type: originalCar.body_type,
      };
      cars[carIndex] = {
        id: originalCar.id,
        owner: originalCar.owner,
        createdOn: newCar.createdOn,
        state: originalCar.state,
        status: originalCar.status,
        price: newCar.price,
        manufacturer: originalCar.manufacturer,
        model: originalCar.model,
        body_type: originalCar.body_type,
      };
      res.status(200).json({
        status: 200,
        data: newCar,
      });
      return;
    }
    res.status(404).json({
      status: 404,
      error: 'car post not found',
    });
  }

  static deletePostedAd(req, res) {
    const post = ads.find(p => p.id === parseInt(req.params.id, 10));
    if (!post) {
      res.status(404).json({
        status: 404,
        error: 'Car Ad not found',
      });
      return;
    }
    const index = ads.indexOf(post);
    ads.splice(index, 1);
    res.status(200).send({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  }

  static allPostedAd(req, res) {
    res.status(200).json({
      status: 200,
      data: ads,
    });
  }
}

export default AdsController;
