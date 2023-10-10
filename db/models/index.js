const {User, UserSchema}= require("./user.model.js");
const {Customer, CustomerSchema}= require("./customer.model.js");


function setupModels(sequelize){
  Customer.init(CustomerSchema, Customer.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Customer.associate(sequelize.models);
}

module.exports = setupModels;
