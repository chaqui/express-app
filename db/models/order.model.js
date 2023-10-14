const {Model, DataTypes, Sequelize} = require('sequelize');
const {CUSTOMER_TABLE} = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {

    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    customerId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'customer_id',
      references: {
        model: CUSTOMER_TABLE,
        key: 'id',
      },
    },

    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    },

    updatedAt:{
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: Sequelize.NOW,
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        if(this.items.length > 0){
          return this.items.reduce((acc, item) => acc + (item.price * item.OrderProduct.amount), 0);
          //solo para la cantidad de la relacion sea pequeña si es grande se debe hacer una consulta
        }
      }
    },

  }

class Order extends Model{

    static associate(models){
      this.belongsTo(models.Customer, {
        as: 'customer'
      });
      this.belongsToMany(models.Product, {
        through: models.OrderProduct,
        foreignKey: 'orderId',
        otherKey: 'productId',
        as: 'items'
      });
    }

    static config(sequelize){
      return {
        sequelize,
        tableName: ORDER_TABLE,
        modelName: 'Order',
        timestamps: false,
        underscored: true,
      }
    }

  }

module.exports = {ORDER_TABLE, OrderSchema, Order}
