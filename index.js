const express = require('express');
const bodyParser = require('body-parser');
const routerApi = require('./routes');
const {swaggerDocs} = require('./swagger')
const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(port, ()=>{
	console.log("Server is running on port 3000");
  swaggerDocs(app,port);
})
