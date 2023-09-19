const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();
router.get('/', (req, res) => {
	const {size} = req.query;
	const limit = size ? parseInt(size) : 10;
	const products = [];
	for(let i = 0; i < limit; i++) {
		products.push({
			id: faker.datatype.uuid(),
			name: faker.commerce.productName(),
			price: parseFloat(faker.commerce.price()),
			image: faker.image.imageUrl()
		});
	}
	res.json(products);
});

router.get('/:id', (req, res) => {

	const products = [
		{
			id: 1,
			name: 'laptop',
			price: 1000
		},
		{
			id: 2,
			name: 'phone',
			price: 500
		}
	];

	const product = products.find(p => p.id === parseInt(req.params.id));

	if(!product) res.status(404).send('The product with the given ID was not found');

	res.json(product);
});
module.exports = router;
