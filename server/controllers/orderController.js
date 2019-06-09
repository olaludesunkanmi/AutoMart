import order from '../models/orderDb';
import users from '../models/userDb';
import cars from '../models/carsDb';

class OrderController {
  static makePurchaseOrder(req, res) {
    const newOrder = {
      id: order[order.length - 1].id + 1,
      buyer: req.body.buyer,
      car_id: req.body.car_id,
      amount: req.body.amount,
      status: req.body.status || 'pending',
    };
    const userId = users.find(b => b.id === parseInt(newOrder.buyer, 10));
    if (!userId) {
      return res.status(404).json({
        status: 404,
        error: 'buyer id not found',
      });
    }

    const carId = cars.find(c => c.id === parseInt(newOrder.car_id, 10));
    if (!carId) {
      return res.status(404).json({
        status: 404,
        error: 'car ordered not found',
      });
    }

    order.push(newOrder);
    return res.status(201).json({
      status: 201,
      data: {
        id: newOrder.id,
        car_id: newOrder.car_id,
        created_on: new Date().toUTCString(),
        status: newOrder.status,
        price: carId.price,
        price_offered: newOrder.amount,
      },
    });
  }

  static updatePurchaseOrderPrice(req, res) {
    const orderId = req.params.id;
    const orderIndex = order.findIndex(o => o.id === parseInt(orderId, 10));
    if (orderIndex > -1) {
      const originalOrder = order[orderIndex];
      if (originalOrder.status !== 'pending') {
        res.status(400).json({
          status: 400,
          error: 'you can change the price of pending purchasing orders only',
        });
        return;
      }
      const newOrder = {
        id: originalOrder.id,
        card_id: originalOrder.card_id,
        created_on: new Date().toUTCString(),
        status: originalOrder.status,
        old_price_offered: originalOrder.price_offered,
        new_price_offered: req.body.price_offered,
      };
      order[orderIndex] = {
        id: originalOrder.id,
        car_id: originalOrder.car_id,
        created_on: newOrder.created_on,
        status: originalOrder.status,
        price: originalOrder.price,
        price_offered: newOrder.new_price_offered,
      };
      res.status(200).json({
        status: 200,
        data: newOrder,
      });
      return;
    }
    res.status(404).json({
      status: 404,
      error: 'order not found',
    });
  }
}

export default OrderController;
