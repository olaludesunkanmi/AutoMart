import express from 'express';
import AdsController from '../controllers/adsContoller';
import AdsAuth from '../middleware/adsAuth';

const { validate } = AdsAuth;
const { postAd } = AdsController;


const carRouter = express.Router();

// post a car sale ad
carRouter.post('/car', validate, postAd);

export default carRouter;
