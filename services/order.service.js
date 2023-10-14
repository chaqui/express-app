const boom = require('@hapi/boom');
const {
  models
} = require('./../libs/sequelize.js');



class OrderService {

  async find() {
    const rta = await models.Order.findAll();
    if (rta) {
      return rta;
    }
    throw boom.notFound('Order not found');
  }

  async create(data) {

    const rta = await models.Order.create(data);
    return rta;

  }

  async findOne(id) {
    const order = await models.Order.findByPk(id,{
      include:['customer','items']
    });
    if (order) {
      return order;
    }
    throw boom.notFound('Order not found');
  }

  async update(id, order) {
    const orderExist = await this.findOne(id);
    const rta = await orderExist.update(order);
    return rta;
  }

  async delete(id) {
    const orderExist = await this.findOne(id);
    await orderExist.destroy();
    return {
      id
    };
  }

  async addProducts(id, products) {
    const order = await this.findOne(id);
    products.orderId = order.id;
    const newItem = await models.OrderProduct.create(products);
    return newItem;
  }

  async getProducts(id) {
    const order = await this.findOne(id);
    const products = await order.getProducts();
    return products;
  }

}

module.exports = OrderService;
