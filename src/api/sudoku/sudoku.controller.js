const {Router} = require('express')
const router = new Router();
const browserPrettyPrintSudoku = require('./browserPrettyPrintSudoku');
const generateSudoku = require('./generateSudoku');
const validSudoku = require('./sudokuValidation')
// JWT od 58:00 minuty nagrania
// skończyłam na 01:22:20
//generate Sudoku
router.get('/', (req, res) => {
    res.send(browserPrettyPrintSudoku(generateSudoku()));
});

//check if Sudoku is solved correctly
router.post('/', async (req, res) =>{
    res.status(200).send(validSudoku(req.body));
});

module.exports = router;
