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

  static getUnsoldCarsWithinPriceRange(req, res) {
    const Price = {
      min_price: req.body.min_price,
      max_price: req.body.max_price,
    };
    const unsoldCars = cars.filter(car => car.status === 'available');
    const PriceRange = unsoldCars.filter(
      p => p.price >= Price.min_price && p.price <= Price.max_price,
    );
    if (!PriceRange.length) {
      res.status(404).json({
        status: 404,
        error: 'there are no cars within that price range not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      data: PriceRange,
    });
  }

  static getUsedUnsoldCars(req, res) {
    const usedUnsoldCars = cars.filter(
      c => c.status === 'available' && c.state === 'used',
    );
    res.status(200).json({
      status: 200,
      data: usedUnsoldCars,
    });
  }
}

export default CarController;
