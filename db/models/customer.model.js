const {
  Model,
  DataTypes,
  Sequelize
} = require('sequelize');

const {USER_TABLE} = require('./user.model.js');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    unique: true,
  },
}

class Customer extends Model {

  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',});
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    }
  }
}

module.exports = {CUSTOMER_TABLE, CustomerSchema, Customer}
