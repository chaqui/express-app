const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize.js');

class CategoryService{

  async find(){
      const rta = await models.Category.findAll();
      if(rta){
          return rta;
      }
      throw boom.notFound('Category not found');
  }

  async create(data){

      const rta = await models.Category.create(data);
      return rta;

  }

  async findOne(id){
    const category = await models.Category.findByPk(id);
    if(category){
      return category;
    }
    throw boom.notFound('Category not found');
  }

  async update(id, category){
    const categoryExist = await this.findOne(id);
    const rta = await categoryExist.update(category);
    return rta;
  }

  async delete(id){
    const categoryExist = await this.findOne(id);
    await categoryExist.destroy();
    return {id};
  }
}

module.exports = CategoryService;
