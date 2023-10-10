const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize.js');

class CustomerService{

      async find(){
          const rta = await models.Customer.findAll();
          if(rta){
              return rta;
          }
          throw boom.notFound('Client not found');
      }

      async create(data){

          const rta = await models.Customer.create(data);
          return rta;

      }

      async findOne(id){
        const customer = await models.Customer.findByPk(id);
        if(customer){
          return customer;
        }
        throw boom.notFound('Customer not found');
      }

      async update(id, customer){
        const customerExist = await this.findOne(id);
        const rta = await customerExist.update(customer);
        return rta;
      }

      async delete(id){
        const customerExist = await this.findOne(id);
        await customerExist.destroy();
        return {id};
      }
}

module.exports = CustomerService;
