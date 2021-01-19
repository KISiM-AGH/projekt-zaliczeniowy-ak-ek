const express = require('express');
const api = require('./src/api')
const objectionErrorHandler = require('./src/middleware/objectionErrorHandler')
const errorHandler = require("./src/middleware/errorHandler");
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || 'development';
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api', api);
app.use(objectionErrorHandler);
app.use(errorHandler);

app.get('/', async (req, res) =>{
    res.send('Witaj w generatorze sudoku!')
});

app.listen(port, '127.0.0.1',() =>{
    console.log(`Server listening on http://127.0.0.1:${port} in ${env} mode`);
});
