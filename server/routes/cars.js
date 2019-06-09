import express from 'express';
import AdsController from '../controllers/adsContoller';
import AdsAuth from '../middleware/adsAuth';
import CarAuth from '../middleware/carAuth';

const { validate, validateMarkAdStatus } = AdsAuth;
const { postAd, markPostedAd, updatePostedAdPrice } = AdsController;
const { validatePostedPrice } = CarAuth;


const carRouter = express.Router();

// post a car sale ad
carRouter.post('/car', validate, postAd);
// mark car post ad as sold
carRouter.patch('/car/:id/status', validateMarkAdStatus, markPostedAd);
// update posted ad price
carRouter.patch('/car/:id/price', validatePostedPrice, updatePostedAdPrice);

export default carRouter;
