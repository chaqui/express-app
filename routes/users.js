const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('./../middlewares/validator.handler.js');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema.js');

const router = express.Router();
const service = new UserService();
router.get('/', async (req, res, next) => {

	try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});


router.post('/',validatorHandler(createUserSchema, 'body'), async (req, res,next) => {
  try{
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json({
      massage: 'Created',

      data:newUser
    });

  }
  catch(err){

    next(err);
  }

});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try{
    const {id} = req.params;
    const user = await service.findOne(id);
    res.json(user);
  }
  catch(err){
    next(err);
  }
});

router.put('/:id',validatorHandler(getUserSchema, 'params'), validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {
  try{
    const {id} = req.params;
    const body = req.body;
    const user = await service.update(id,body);
    res.json(user);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:id',validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try{
    const {id} = req.params;
    const r = await service.delete(id);
    res.json(r);
  }
  catch(err){
    next(err);
  }
});



module.exports = router;
