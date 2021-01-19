//const arrivedSudoku = require('../../models/sudoku.model')
function sudokuValidation(arrivedSudoku){
    let sudokuArray = [];
    sudokuArray[0] = arrivedSudoku.row1;
    sudokuArray[1] = arrivedSudoku.row2;
    sudokuArray[2] = arrivedSudoku.row3;
    sudokuArray[3] = arrivedSudoku.row4;
    sudokuArray[4] = arrivedSudoku.row5;
    sudokuArray[5] = arrivedSudoku.row6;
    sudokuArray[6] = arrivedSudoku.row7;
    sudokuArray[7] = arrivedSudoku.row8;
    sudokuArray[8] = arrivedSudoku.row9;
    if(valid(sudokuArray)){
        //dodać zapisanie wyniku!
        return "Correct!";
    } else return "Not correct!";
}
function valid(arraySolution) {
    for (let y = 0; y < 9; ++y) {
        for (let x = 0; x < 9; ++x) {
            let value = arraySolution[y][x];

            if (value) {
                // Check the line
                for (let x2 = 0; x2 < 9; ++x2) {
                    if (x2 !== x && arraySolution[y][x2] === value) {
                        return false;
                    }
                }

                // Check the column
                for (let y2 = 0; y2 < 9; ++y2) {
                    if (y2 !== y && arraySolution[y2][x] === value) {
                        return false;
                    }
                }

                // Check the square
                let startY = Math.floor(y/3)*3;
                for (let y2 = startY; y2 < startY + 3; ++y2) {
                    let startX = Math.floor(x/3)*3;
                    for (let x2 = startX; x2 < startX + 3; ++x2) {
                        if ((x2 !== x || y2 !== y) && arraySolution[y2][x2] === value) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

module.exports = sudokuValidation;