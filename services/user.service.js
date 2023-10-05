const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize.js');

class UserService{

    async find(){
        const rta = await models.User.findAll();
        if(rta){
            return rta;
        }
        throw boom.notFound('Client not found');
    }

    async create(data){

        const rta = await models.User.create(data);
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
}

module.exports = UserService;
