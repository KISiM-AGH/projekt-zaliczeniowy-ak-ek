const {Router} = require('express')
const router = new Router();
const wyniki = require('../../models/wyniki.model')
const browserPrettyPrintSudoku = require('./browserPrettyPrintSudoku');
const generateSudoku = require('./generateSudoku');
const validateSudoku = require('./validateSudoku')
const asyncHandler = require("../../middleware/asyncHandler");
const addScore = require("../wyniki/addScore");
const {auth} = require("../../middleware/auth");

//generating Sudoku of passed difficulty, throws InvalidDataPassed
router.get('/:poziomtrudnosci', auth({required: true}), (req, res) => {
    res.send(browserPrettyPrintSudoku(generateSudoku(req, res)));
});

//checking if Sudoku is solved correctly, adding score to database if solved correctly
router.post('/',  auth({required: true}), asyncHandler(async (req, res) =>{
    const outcome = validateSudoku(req);
    if(outcome === true)
        await addScore(req, res, wyniki);
    else
        res.status(200).send('You have failed to solve the puzzle!')
}));

module.exports = router;
