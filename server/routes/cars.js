import express from 'express';
import AdsController from '../controllers/adsController';
import AdsAuth from '../middleware/adsAuth';
import Auth from '../middleware/auth';

const { verifyToken } = Auth;
const { validate, validateMarkAdStatus } = AdsAuth;
const { postAd, markPostedAd } = AdsController;

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

export default carRouter;
