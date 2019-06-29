import express from 'express';
import OrderController from '../controllers/orderController';
import OrderAuth from '../middleware/orderAuth';
import Auth from '../middleware/auth';

const { makePurchaseOrder } = OrderController;
const { validateOrder } = OrderAuth;
const { verifyToken } = Auth;

const orderRouter = express.Router();

orderRouter.post('/order', verifyToken, validateOrder, makePurchaseOrder);

export default orderRouter;
