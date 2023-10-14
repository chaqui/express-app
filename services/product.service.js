
const boom = require('@hapi/boom');
const {
  models
} = require('../libs/sequelize.js');

class ProductService {


  async create(product) {
    const newProduct = await models.Product.create(product);
    return newProduct;
  }

  async find(limit = 5, offset = 0) {
    const products = await models.Product.findAll({
      limit,
      offset
    });
    if (products) {
      return products;
    }
    throw boom.notFound('Products not found');

  }

  async findOne(id) {

    const product = await models.Product.findByPk(id);
    if (product) {
      return product;
    }
    throw boom.notFound('Product not found');
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return {
      id
    };
  }
}

module.exports = ProductService;
