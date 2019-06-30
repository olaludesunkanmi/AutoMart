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
}

export default CarController;
