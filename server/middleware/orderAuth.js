const Joi = require('joi');

export default class OrderAuth {
  static validateOrder(req, res, next) {
    const newOrderSchema = {
      status: Joi.string().required(),
      buyer: Joi.number().required(),
      car_id: Joi.number().required(),
      amount: Joi.number().required(),
    };
    const { error } = Joi.validate(req.body, newOrderSchema);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }

  static validateUpdatePrice(req, res, next) {
    const newPriceSchema = {
      price_offered: Joi.number().required(),
    };
    const { error } = Joi.validate(req.body, newPriceSchema);
    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }
}
