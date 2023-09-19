const swaggerJS = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui');

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Demo Api",
			version: "1.0.0"
		}
	}
		apis:["index.js"]
	}

const swaggerSpec = swaggerJS(swaggerOptions);
const swaggerDocs = (app,port){
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
	console.log('swagger.js is running');
}


module.exports = {swaggerDocs};
