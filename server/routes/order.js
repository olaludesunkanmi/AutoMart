import express from 'express';
import OrderController from '../controllers/orderController';
import OrderAuth from '../middleware/orderAuth';

const { makePurchaseOrder, updatePurchaseOrderPrice } = OrderController;
const { validateOrder, validateUpdatePrice } = OrderAuth;

const orderRouter = express.Router();

orderRouter.post('/order', validateOrder, makePurchaseOrder);
orderRouter.patch(
  '/order/:id/price',
  validateUpdatePrice,
  updatePurchaseOrderPrice,
);

export default orderRouter;
