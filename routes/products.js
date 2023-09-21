const express = require('express');
const ProductService = require('./../services/product.service.js')
const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
  let products = service.find();
  res.status(200).json(products);
});

router.post('/',(req,res)=>{
  const body = req.body;
  service.create(body);
  res.status(201).json({
    massage: 'Created',
    data:body
  });
});


router.put('/:id',(req,res)=>{
  const id = req.params.id
  const body = req.body;
  console.log(body);
  res.json({
    massage: 'Modified',
    id,
    data:body
  });
});



router.patch('/:id',(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  console.log(body);
  res.json({
    massage: 'Modified',
    id,
    data:body
  });
});

router.delete('/:id',(req,res)=>{

  const {id} = req.params;
  res.json({
    message:"Delete",
    id
  });
})

router.get('/:id', (req, res) => {

  const {id} = req.params;
  product = service.findOne(id)
	if(!product) res.status(404).send('The product with the given ID was not found');
	res.status(200).json(product);
});



module.exports = router;
