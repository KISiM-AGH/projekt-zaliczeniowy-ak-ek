const {Router} = require('express')
const router = new Router();
const browserPrettyPrintSudoku = require('./browserPrettyPrintSudoku');
const generateSudoku = require('./generateSudoku');
const validSudoku = require('./sudokuValidation')
const asyncHandler = require("../../middleware/asyncHandler");
const {auth} = require("../../middleware/auth");
// JWT od 58:00 minuty nagrania
// skończyłam na 01:22:20
//generate Sudoku
router.get('/', auth({required: true}), (req, res) => {
    res.send(browserPrettyPrintSudoku(generateSudoku()));
});

//check if Sudoku is solved correctly
router.post('/',  (req, res) =>{
    res.status(200).send(validSudoku(req.body));
});

module.exports = router;
