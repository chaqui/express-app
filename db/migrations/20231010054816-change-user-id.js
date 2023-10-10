'use strict';
const {
  DataTypes
} = require('sequelize');

const {
  CUSTOMER_TABLE
} = require('./../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      unique: true
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
