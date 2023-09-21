const express = require('express');
const productsRouter = require('./products');
const usersRouter = require('./users');

function routerApi(app) {
  const router = express.Router();
 	router.use('/products', productsRouter);
	router.use('/users', usersRouter);
  app.use('/api/v1',router);
}

module.exports = routerApi;
