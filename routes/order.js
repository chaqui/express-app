const express = require('express');
const OrderService = require('./../services/order.service.js')
const validatorHandler = require('./../middlewares/validator.handler.js');
const  { createOrderSchema, updateOrderSchema, getOrderSchema}= require('./../schemas/order.schema.js');
const  { createOrderProductSchema}= require('./../schemas/product-order.schema.js');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res) => {
  let orders = await service.find();
  res.status(200).json(orders);
});

router.get('/:id',validatorHandler(getOrderSchema, 'params'), async (req, res, next) => {
  try {
    const {id} = req.params;
    const order = await service.findOne(id);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

router.post('/',validatorHandler(createOrderSchema, 'body'), async(req,res,next)=>{
  try{
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json({
      massage: 'Created',
      data:newOrder
    });
  }
  catch(err){
    next(err);
  }
});

router.patch('/:id',validatorHandler(getOrderSchema, 'params'),validatorHandler(updateOrderSchema, 'body'), async (req,res, next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const order = await service.update(id,body);
    res.json(order);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:id',validatorHandler(getOrderSchema, 'params'), async(req,res, next)=>{
  try{
    const {id} = req.params;
    const r = await service.delete(id);
    res.json(r);
  }
  catch(err){
    next(err);
  }
});

router.post('/:id/products',validatorHandler(getOrderSchema, 'params'),validatorHandler(createOrderProductSchema, 'body'), async(req,res, next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const r = await service.addProducts(id,body);
    res.json(r);
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
