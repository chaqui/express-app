const express = require('express');
const productsRouter = require('./products');
const usersRouter = require('./users');
const customer = require('./customer');
const categories = require('./categories');
const orders = require('./order');

function routerApi(app) {
  const router = express.Router();
 	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
  router.use('/customers', customer);
  router.use('/categories', categories);
  router.use('/orders', orders);
  app.use('/api/v1',router);
}

module.exports = routerApi;
