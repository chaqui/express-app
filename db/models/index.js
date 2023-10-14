const {User, UserSchema}= require("./user.model.js");
const {Customer, CustomerSchema}= require("./customer.model.js");
const {Product, ProductSchema}= require("./product.model.js");
const {Category, CategorySchema}= require("./category.model.js");
const {Order, OrderSchema}= require("./order.model.js");
const {OrderProduct, OrderProductSchema}= require("./order-product.model.js");

function setupModels(sequelize){
  //models initialization
  Customer.init(CustomerSchema, Customer.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  //associations
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;
