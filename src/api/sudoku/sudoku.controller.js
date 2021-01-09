const {Router} = require('express')
const router = new Router();
const SudokuGenerator = require("js-sudoku-generator").SudokuGenerator;

router.get('/', (req, res) => {
    SudokuGenerator.generate(1);
    let Board = SudokuGenerator.generatedBoards[0];
    let Sheet = Board.getSheet(0);
    let tab = [];
    tab = Sheet;
    Board.prettyPrint(Sheet);
    let finalSudoku = [];
    let splitTab = [], final = [];
    finalSudoku = '<br> ' + 'Sudoku to solve' + ' <br> ' + '<br> ';
    for(let i = 0; i < 9; i++){
        final = "";
        final = ' | ';
        splitTab = tab[i].toString().split("");
        let counter = true;
        let temp=0;
        let p=0;
        if(splitTab[0] == ','){
            final = final + " _ ";
            counter = true;
            temp=1;
            p++;
        } else {
            final = final + ' ' + splitTab[0] + ' ';
            temp=2;
            p++;
        }

        for(let i=temp; i<splitTab.length; i++){
            if(splitTab[i]==','){
                if(counter==true){
                    final = final + " _ ";
                    counter = true; //był przecinek
                    p++;
                    if(p%3 == 0){
                        final = final + ' | ';
                    }
                } else {
                    counter = true;
                }
            }
            else{
                final = final + ' ' + splitTab[i] + ' ';
                counter = false; //nie było przecinka
                p++;
                if(p%3 == 0){
                    final = final + ' | ';
                }
            }
            if(i == splitTab.length-1 && splitTab[i] == ','){
                final = final + ' _ ' + " | ";
            }
        }
        if((i+1)%3 == 0){
            finalSudoku = finalSudoku + final + ' <br> ' + '<br> ';
        } else finalSudoku = finalSudoku + final + ' <br> ';

    }
    res.send(finalSudoku);
});

module.exports = router;
