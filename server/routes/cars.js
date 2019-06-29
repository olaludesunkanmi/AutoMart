import express from 'express';
import AdsController from '../controllers/adsController';
import AdsAuth from '../middleware/adsAuth';
import Auth from '../middleware/auth';

const { verifyToken } = Auth;
const { validate } = AdsAuth;
const { postAd } = AdsController;

const carRouter = express.Router();

// post a car sale ad
carRouter.post('/car', verifyToken, validate, postAd);

export default carRouter;
