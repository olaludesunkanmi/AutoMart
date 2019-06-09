import express from 'express';
import AdsController from '../controllers/adsContoller';
import AdsAuth from '../middleware/adsAuth';

const { validate, validateMarkAdStatus } = AdsAuth;
const { postAd, markPostedAd } = AdsController;


const carRouter = express.Router();

// post a car sale ad
carRouter.post('/car', validate, postAd);
// mark car post ad as sold
carRouter.patch('/car/:id/status', validateMarkAdStatus, markPostedAd);

export default carRouter;
