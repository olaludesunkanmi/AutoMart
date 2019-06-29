const Joi = require('joi');

export default class AdsAuth {
  static validate(req, res, next) {
    const newAdschema = {
      manufacturer: Joi.string().required(),
      model: Joi.string().required(),
      price: Joi.number().required(),
      state: Joi.string()
        .valid('new', 'used')
        .required(),
      status: Joi.string()
        .valid('available', 'sold')
        .required(),
      body_type: Joi.string(),
    };

    const { error } = Joi.validate(req.body, newAdschema);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }

  static validateMarkAdStatus(req, res, next) {
    const newStatusSchema = {
      status: Joi.string()
        .valid('sold', 'available')
        .required(),
    };

    const { error } = Joi.validate(req.body, newStatusSchema);

    if (error) {
      return res
        .status(400)
        .json({ status: 400, error: error.details[0].message });
    }
    return next();
  }
}
