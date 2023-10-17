const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require('../schemas/category.schema');
const {checkRoles} = require('../middlewares/auth.handler');
const CategoryService = require('../services/category.service');


const router = express.Router();

const service = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.status(200).json(categories);
});


router.post('/', passport.authenticate('jwt', {
  session: false
}),
checkRoles('admin', 'sales'),
validatorHandler(createCategorySchema, 'body'), async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json({
    message: 'Created',
    data: newCategory
  });
});

router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const category = await service.findOne(id);

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validatorHandler(getCategorySchema, 'params'), validatorHandler(updateCategorySchema, 'body'), async (req, res, next) => {
  const {
    id
  } = req.params;
  const body = req.body;
  try {
    const category = await service.update(id, body);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const category = await service.delete(id);
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
