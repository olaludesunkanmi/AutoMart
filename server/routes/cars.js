import express from 'express';
import AdsController from '../controllers/adsController';
import CarController from '../controllers/carController';
import AdsAuth from '../middleware/adsAuth';
import CarAuth from '../middleware/carAuth';
import Auth from '../middleware/auth';

const { verifyToken } = Auth;
const { validate, validateMarkAdStatus } = AdsAuth;
const {
  postAd, markPostedAd, updatePostedAdPrice, deletePostedAd,
} = AdsController;
const { validatePostedPrice, validateRange } = CarAuth;
const { getSpecificCar, getUnsoldCars, getUnsoldCarsWithinPriceRange } = CarController;

const carRouter = express.Router();

// post a car sale ad
carRouter.post('/car', verifyToken, validate, postAd);
// mark car post ad as sold
carRouter.patch(
  '/car/:id/status',
  verifyToken,
  validateMarkAdStatus,
  markPostedAd,
);
// update posted ad price
carRouter.patch(
  '/car/:id/price',
  verifyToken,
  validatePostedPrice,
  updatePostedAdPrice,
);
// get a specific car
carRouter.get('/car/:id', verifyToken, getSpecificCar);
// get all unsold cars
carRouter.get('/available', verifyToken, getUnsoldCars);
// get cars within a price range
carRouter.get(
  '/available/range',
  verifyToken,
  validateRange,
  getUnsoldCarsWithinPriceRange,
);
// delete a posted car ad
carRouter.delete('/car/:id', verifyToken, deletePostedAd);

export default carRouter;
