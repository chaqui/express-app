const {Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';
const UserSchema = {

  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password:{
    type: DataTypes.STRING,
    allowNull: false,
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

}

class User extends Model{


  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User}
