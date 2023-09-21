
const {faker} = require('@faker-js/faker');

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

  create(product){
    this.products.push(product);
  }

  find(){
    return this.products;
  }

  findOne(id){

	return  this.products.find(p => p.id === parseInt(id));
  }

  update(){

  }
  delete(){

  }
}

module.exports = ProductService;
