import ads from '../models/adsDb';
import users from '../models/userDb';
import cars from '../models/carsDb';

class AdsController {
  static postAd(req, res) {
    const newAd = {
      id: ads[ads.length - 1].id + 1,
      createdOn: new Date().toUTCString(),
      owner: req.body.owner,
      email: req.body.email,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      price: req.body.price,
      state: req.body.state,
      status: req.body.status,
    };
    const userId = users.find(o => o.id === parseInt(newAd.owner, 10));
    if (!userId) {
      return res.status(404).json({
        status: 404,
        error: 'owner not found',
      });
    }
    const user = users.find(e => e.email === newAd.email);
    if (!user) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }

    ads.push(newAd);
    return res.status(201).json({
      status: 201,
      data: {
        id: newAd.id,
        createdOn: new Date().toUTCString(),
        email: req.body.email,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        price: req.body.price,
        state: req.body.state,
        status: req.body.status,
      },
    });
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
