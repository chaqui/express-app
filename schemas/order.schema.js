const Joi = require('joi');

const id = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: id.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = {createOrderSchema, getOrderSchema};
