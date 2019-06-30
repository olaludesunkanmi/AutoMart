import db from '../config/index';

class CarController {
  // get specific car
  static async getSpecificCar(req, res) {
    try {
      const findCar = 'SELECT * FROM cars WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const car = await db.query(findCar, [value]);
      if (!car.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'car not found',
          data: [],
        });
      } else {
        res.status(200).json({
          status: 200,
          data: car.rows[0],
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error,
      });
    }
  }

  // get unsold cars
  static async getUnsoldCars(req, res) {
    try {
      const findUnsoldCars = 'SELECT * FROM cars WHERE status = $1';
      const value = req.body.status;
      const unsoldCars = await db.query(findUnsoldCars, [value]);

      if (!unsoldCars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'No available car found',
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: unsoldCars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
  }

  // get unsold cars within a price range
  static async getUnsoldCarsWithinPriceRange(req, res) {
    try {
      const findPrice = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3';
      const values = [req.body.status, req.body.min_price, req.body.max_price];
      const range = await db.query(findPrice, values);

      if (!range.rows[0]) {
        res.status(404).json({
          status: 404,
          message: 'can not find car within that range',
          data: [],
        });
      } else {
        res.status(200).json({
          status: 200,
          data: range.rows,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
  }

  // get used unsold cars
  static async getUsedUnsoldCars(req, res) {
    try {
      const findUsedUnsoldCars = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
      const values = [req.body.status, req.body.state];
      const usedUnsoldCars = await db.query(findUsedUnsoldCars, values);

      if (!usedUnsoldCars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: `no ${req.body.state} ${req.body.status} car found`,
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: usedUnsoldCars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }

  // get new unsold cars
  static async getNewUnsoldCars(req, res) {
    try {
      const findNewUnsoldCars = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
      const values = [req.body.status, req.body.state];
      const newUnsoldCars = await db.query(findNewUnsoldCars, values);

      if (!newUnsoldCars.rows[0]) {
        res.status(404).json({
          status: 404,
          message: `no ${req.body.state} ${req.body.status} car found`,
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: newUnsoldCars.rows,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Server error',
      });
    }
  }
}

export default CarController;
