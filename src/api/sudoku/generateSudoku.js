const SudokuGenerator = require("js-sudoku-generator").SudokuGenerator;
const config = require("../../../config");
const InvalidDataPassedError = require('../../exceptions/invalid-data-passed-exception')

function generateSudoku(req, res) {
    if(req.params.poziomtrudnosci > 2 || req.params.poziomtrudnosci < 0 || req.params.poziomtrudnosci === undefined)
        throw new InvalidDataPassedError();
    SudokuGenerator.generate(1);
    const today = new Date();
    let currentHours = today.getHours();
    if(currentHours < 10) currentHours = '0'+(currentHours.toString());
    let currentMinutes = today.getMinutes();
    if(currentMinutes < 10) currentMinutes = '0'+(currentMinutes.toString());
    let currentSeconds = today.getSeconds();
    if(currentSeconds < 10) currentSeconds = '0'+(currentSeconds.toString());
    const timestamp = currentHours + ":" + currentMinutes + ":" + currentSeconds;
    res.cookie('sudokuStartTime', timestamp, config.cookiesOptions);
    res.cookie('sudokuLevel', req.params.poziomtrudnosci, config.cookiesOptions);

    let Board = SudokuGenerator.generatedBoards[0];
    let Sheet = Board.getSheet(req.body.poziomtrudnosci);
    let controlSum = 0;
    for(let i = 0; i < 9; i++)
    {
        controlSum += Board.board[i][i];
    }
    res.cookie('controlSum', controlSum, config.cookiesOptions);
    return Sheet;
}

module.exports = generateSudoku;