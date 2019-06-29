/* eslint-disable import/no-named-as-default-member */
import db from '../config/index';

class OrderController {
  static async makePurchaseOrder(req, res) {
    try {
      const newOrder = {
        car_id: req.body.car_id,
        amount: req.body.amount,
        status: req.body.status || 'pending',
        buyer: req.body.buyer,
      };

      const findCarId = 'SELECT * FROM cars WHERE id = $1';
      const carValue = newOrder.car_id;
      const carId = await db.query(findCarId, [carValue]);

      if (!carId.rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'car ordered not found',
        });
        return;
      }
      const insertOrder = 'INSERT INTO orders(buyer, car_id, amount, status) VALUES($1, $2, $3, $4) RETURNING *';
      const results = await db.query(insertOrder, [
        req.user.id,
        newOrder.car_id,
        newOrder.amount,
        newOrder.status,
      ]);

      res.status(201).json({
        status: 201,
        data: {
          id: results.rows[0].id,
          car_id: results.rows[0].car_id,
          created_on: new Date().toUTCString(),
          status: results.rows[0].status,
          price: carId.rows[0].price,
          price_offered: results.rows[0].amount,
        },
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
  }

  static async updatePurchaseOrderPrice(req, res) {
    try {
      const findOrderId = 'SELECT * FROM orders WHERE id = $1';
      const value = parseInt(req.params.id, 10);
      const idFound = await db.query(findOrderId, [value]);
      if (!idFound.rows[0]) {
        res.status(404).json({
          status: 404,
          error: 'order not found',
        });
        return;
      }
      if (idFound.rows[0].status !== 'pending') {
        res.status(403).json({
          status: 403,
          error: 'you can change the price of pending purchasing orders only',
        });
        return;
      }

      const newPrice = 'UPDATE orders SET amount = $1 WHERE id = $2';
      const values = [req.body.price_offered, value];
      await db.query(newPrice, values);

      const newOrder = {
        id: idFound.rows[0].id,
        card_id: idFound.rows[0].card_id,
        created_on: new Date().toUTCString(),
        status: idFound.rows[0].status,
        old_price_offered: idFound.rows[0].amount,
        new_price_offered: req.body.price_offered,
      };

      res.status(200).json({
        status: 200,
        data: newOrder,
      });
      return;
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
  }
}

export default OrderController;
