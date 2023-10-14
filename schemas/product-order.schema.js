const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const productId = Joi.number().integer();

const createOrderProductSchema = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
});

const getOrderProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {createOrderProductSchema, getOrderProductSchema};
