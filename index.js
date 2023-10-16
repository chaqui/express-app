const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./routes');
const {swaggerDocs} = require('./swagger')
const {logErrors,errorHandler,boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler');
const {checkApiKey} = require('./middlewares/auth.handler');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/nn',checkApiKey, (req, res) => res.send('Hello World!'));
routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(cors());
app.listen(port, ()=>{
	console.log("Server is running on port "+port);
  swaggerDocs(app,port);
})
