const SudokuGenerator = require("js-sudoku-generator").SudokuGenerator;

function generateSudoku() {
    SudokuGenerator.generate(1);
    let Board = SudokuGenerator.generatedBoards[0];
    return Board.getSheet(0);
}

module.exports = generateSudoku;