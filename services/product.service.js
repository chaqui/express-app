const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService{

  constructor(){

    this.products=[];
    this.generate();
  }

  generate(){

	  const limit =  100;
	  for(let i = 0; i < limit; i++) {
		  this.products.push({
			  id: faker.datatype.uuid(),
			  name: faker.commerce.productName(),
			  price: parseFloat(faker.commerce.price()),
			  image: faker.image.imageUrl()
		  });
	  }
  }

  async create(product){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return this.products;
  }

  async findOne(id){

	  const product =  this.products.find(p => p.id === id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    return product;
  }

   async update(id, changes){
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products[index] = changes;
    return this.products[index];
  }
   async delete(id){
    const index = this.products.findIndex(p => p.id === parseInt(id));
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return {id};
  }
}

module.exports = ProductService;