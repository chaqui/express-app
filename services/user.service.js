const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize.js');
const bcrypt = require('bcrypt');

class UserService{

    async find(){
        const rta = await models.User.findAll();
        if(rta){
            return rta;
        }
        throw boom.notFound('Client not found');
    }

    async create(data){
        data.password = await bcrypt.hash(data.password, 10);
        const rta = await models.User.create(data);
        delete rta.dataValues.password;
        return rta;

    }

    async findOne(id){
      const user = await models.User.findByPk(id);
      if(user){
        return user;
      }
      throw boom.notFound('User not found');
    }

    async update(id, user){
      const userExist = await this.findOne(id);
      const rta = await userExist.update(user);
      return rta;
    }

    async delete(id){
      const userExist = await this.findOne(id);
      await userExist.destroy();
      return {id};
    }

    async findByEmail(email){
      const user = await models.User.findOne({where: {email}});
      if(user){
        return user;
      }
      throw boom.notFound('User not found');
    }
}

module.exports = UserService;
