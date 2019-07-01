/* eslint-disable camelcase */
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

  // mark a posted car ad as sold
  static async markPostedAd(req, res) {
    try {
      const findCarId = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const car = await db.query(findCarId, [value]);
      if (!car.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'car post not found',
          data: [],
        });
        return;
      }
      if (car.rows[0].status === req.body.status) {
        res.status(400).json({
          status: 400,
          error: `The car is already marked as ${car.rows[0].status}`,
        });
        return;
      }

      const carStatus = 'UPDATE cars SET status = $1 WHERE id = $2';
      const values = [req.body.status, value];
      await db.query(carStatus, values);
      const {
        id, owner, manufacturer, model, price, state,
      } = car.rows[0];
      const newCar = {
        id,
        owner,
        createdOn: new Date().toUTCString(),
        manufacturer,
        model,
        price,
        state,
        status: req.body.status,
      };

      res.status(200).json({
        status: 200,
        data: newCar,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  // get all posted car ads
  static async allPostedAd(req, res) {
    try {
      const findCars = 'SELECT * FROM cars';
      const cars = await db.query(findCars);
      if (!cars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'no car found',
          data: [],
        });
      }
      res.status(200).json({
        status: 200,
        data: cars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }

  // update the price of the posted car ad
  static async updatePostedAdPrice(req, res) {
    try {
      const findCarId = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const carId = await db.query(findCarId, [value]);

      if (!carId.rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'Car post not found',
        });
        return;
      }
      const updateCar = 'UPDATE cars SET price = $1  WHERE id = $2';
      const values = [req.body.price, value];
      await db.query(updateCar, values);

      const {
        id,
        owner,
        state,
        status,
        manufacturer,
        model,
        body_type,
      } = carId.rows[0];
      res.status(200).json({
        status: 200,
        data: {
          id,
          owner,
          createdOn: new Date().toUTCString(),
          state,
          status,
          price: req.body.price,
          manufacturer,
          model,
          body_type,
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

  // delete a car ad
  static async deletePostedAd(req, res) {
    try {
      const findCar = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const car = await db.query(findCar, [value]);
      if (!car.rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'Car Ad not found',
        });
        return;
      }
      if (car.rows[0].owner !== req.user.id && req.user.email !== 'createadmin@yahoo.com') {
        res.status(403).json({
          status: 403,
          error: 'Sorry, you can not delete this car',
        });
        return;
      }
      const deleteCar = 'DELETE FROM cars WHERE id = $1';
      await db.query(deleteCar, [value]);

      res.status(200).send({
        status: 200,
        data: 'Car Ad successfully deleted',
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }
}

export default AdsController;
