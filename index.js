const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1', routerApi(app));

app.listen(port, ()=>{
	console.log("Server is running on port 3000");
})
