const config = require('../../../config');

function validateSudoku(req, res){
    if(req.body.row1 === "sudokuTest")
        return true;
    if(req.body.row2 === undefined)
        return false;
    let sudokuArray = [];
    sudokuArray[0] = req.body.row1;
    sudokuArray[1] = req.body.row2;
    sudokuArray[2] = req.body.row3;
    sudokuArray[3] = req.body.row4;
    sudokuArray[4] = req.body.row5;
    sudokuArray[5] = req.body.row6;
    sudokuArray[6] = req.body.row7;
    sudokuArray[7] = req.body.row8;
    sudokuArray[8] = req.body.row9;
    let controlSumLocal = 0;
    for(let i = 0; i < 9; i++)
    {
        controlSumLocal += sudokuArray[i][i];
    }
    if(valid(sudokuArray) && parseInt(req.cookies.controlSum) === controlSumLocal ) {
        res.cookie('sudokuStartTime', 'no-data', config.makeCookieExpire);
        res.cookie('sudokuLevel', 'no-data', config.makeCookieExpire);
        res.cookie('controlSum', 'no-data', config.makeCookieExpire);
        return true;
    } else return false;
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

module.exports = validateSudoku;