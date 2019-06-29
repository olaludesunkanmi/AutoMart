import express from 'express';
import OrderController from '../controllers/orderController';
import OrderAuth from '../middleware/orderAuth';
import Auth from '../middleware/auth';

const { makePurchaseOrder, updatePurchaseOrderPrice } = OrderController;
const { validateOrder, validateUpdatePrice } = OrderAuth;
const { verifyToken } = Auth;

const orderRouter = express.Router();

orderRouter.post('/order', verifyToken, validateOrder, makePurchaseOrder);
orderRouter.patch(
  '/order/:id/price',
  verifyToken,
  validateUpdatePrice,
  updatePurchaseOrderPrice,
);

export default orderRouter;
