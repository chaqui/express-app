const swaggerJS = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
swaggerDefinition: {
  openapi: "3.0.0",
  info: {
    title: "Demo Api",
    version: "1.0.0"
  }
},
  apis:['routes/*.js']
}

const swaggerSpec = swaggerJS(swaggerOptions);
const swaggerDocs = (app,port) =>{
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('swagger.js is running');
  console.log('http://localhost:'+port+'/api-docs');
}


module.exports = {swaggerDocs};
