import express from 'express';
import AdsController from '../controllers/adsController';
import AdsAuth from '../middleware/adsAuth';
import CarAuth from '../middleware/carAuth';
import Auth from '../middleware/auth';

const { verifyToken } = Auth;
const { validate, validateMarkAdStatus } = AdsAuth;
const { postAd, markPostedAd, updatePostedAdPrice } = AdsController;
const { validatePostedPrice } = CarAuth;

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

export default carRouter;
