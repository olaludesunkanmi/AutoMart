import express from 'express';
import AdsController from '../controllers/adsContoller';
import AdsAuth from '../middleware/adsAuth';
import CarAuth from '../middleware/carAuth';
import CarController from '../controllers/carController';

const { validate, validateMarkAdStatus } = AdsAuth;
const {
  postAd, markPostedAd, updatePostedAdPrice, deletePostedAd,
  allPostedAd,
} = AdsController;
const { validatePostedPrice, validateRange } = CarAuth;
const {
  getSpecificCar, getUnsoldCars, getUnsoldCarsWithinPriceRange, getUsedUnsoldCars,
} = CarController;


const carRouter = express.Router();

// post a car sale ad
carRouter.post('/car', validate, postAd);
// mark car post ad as sold
carRouter.patch('/car/:id/status', validateMarkAdStatus, markPostedAd);
// update posted ad price
carRouter.patch('/car/:id/price', validatePostedPrice, updatePostedAdPrice);
// get a specific car
carRouter.get('/car/:id', getSpecificCar);
// get all unsold cars
carRouter.get('/available', getUnsoldCars);
// get cars within a price range
carRouter.get('/available/range', validateRange, getUnsoldCarsWithinPriceRange);
// delete a posted car ad
carRouter.delete('/car/:id', deletePostedAd);
// get all posted car ads
carRouter.get('/car/', allPostedAd);
// get all used unsold cars
carRouter.get('/available/used', getUsedUnsoldCars);

export default carRouter;
