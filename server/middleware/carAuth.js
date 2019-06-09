const Joi = require('joi');

export default class CarAuth {
  static validatePostedPrice(req, res, next) {
    const newPriceSchema = {
      price: Joi.number().required(),
    };
    const { error } = Joi.validate(req.body, newPriceSchema);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }

  static validateRange(req, res, next) {
    const newPriceSchema = {
      min_price: Joi.number().required(),
      max_price: Joi.number().required(),
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
