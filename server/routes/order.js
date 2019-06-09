import express from 'express';
import OrderController from '../controllers/orderController';
import OrderAuth from '../middleware/orderAuth';

const { makePurchaseOrder } = OrderController;
const { validateOrder } = OrderAuth;

const orderRouter = express.Router();

orderRouter.post('/order', validateOrder, makePurchaseOrder);

export default orderRouter;
