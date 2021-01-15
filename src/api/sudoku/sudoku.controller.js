const {Router} = require('express')
const router = new Router();
const browserPrettyPrintSudoku = require('./browserPrettyPrintSudoku');
const generateSudoku = require('./generateSudoku');
const validSudoku = require('./sudokuValidation')

//generate Sudoku
router.get('/', (req, res) => {
    res.send(browserPrettyPrintSudoku(generateSudoku()));
});

//check if Sudoku is solved correctly
router.post('/', async (req, res) =>{
    res.status(200).send(validSudoku(req.body));
});

module.exports = router;
