import cars from '../models/carsDb';

class CarController {
  static getSpecificCar(req, res) {
    const car = cars.find(c => c.id === parseInt(req.params.id, 10));
    if (!car) {
      res.status(404).json({
        status: 404,
        error: 'car not found',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: car,
      });
    }
  }

  static getUnsoldCars(req, res) {
    const unsoldCars = cars.filter(car => car.status === 'available');
    res.status(200).json({
      status: 200,
      data: unsoldCars,
    });
  }
}

export default CarController;
