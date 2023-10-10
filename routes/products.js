const express = require('express');
const ProductService = require('./../services/product.service.js')
const validatorHandler = require('./../middlewares/validator.handler.js');
const  { createProductSchema, updateProductSchema, getProductSchema}= require('./../schemas/product.schema.js');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  let products = await service.find();
  res.status(200).json(products);
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    massage: 'Created',

    data:newProduct
  });
});


router.put('/:id',
  async(req,res)=>{
    const id = req.params.id
    const body = req.body;
    console.log(body);
    res.json({
      massage: 'Modified',
      id,
    data:body
  });
});



router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res, next)=>{
  try{
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:id', async(req,res, next)=>{
  try{
    const {id} = req.params;
    const r = await service.delete(id);
    res.json(r);
  }catch(err){
    next(err);
  }
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res,next) => {

    try{
      const {id} = req.params;
      const product = await service.findOne(id)
      res.json(product);
    }catch(err){
      next(err);
    }
  });



module.exports = router;
