const express = require('express');
const port = 9000;
const env = process.env.NODE_ENV || 'development';
const app = express();
app.use(express.json());

const dbUSER = [];

app.get('/', (req, res) =>{
    res.send({msg: 'Witam serdecznie ze szkieletu generatora sudoku REST, wprowadzam delikatną zmianę'})
})

app.post('/User',(req, res) =>{
    const {name, surname} = req.body;
    const user = {name, surname};
    //walidacja danych
    //dbUSER atrapa bazy danych
    dbUSER.push(user);
    res.status(201).send(user);
})

app.get('/User', (req, res) => {
    res.send(dbUSER);
})

app.listen(port, '127.0.0.1',() =>{
    console.log(`Server listening on http://127.0.0.1:${port} in ${env} mode`);
} );