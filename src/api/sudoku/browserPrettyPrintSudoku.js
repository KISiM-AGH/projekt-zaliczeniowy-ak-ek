function browserPrettyPrint(Sheet) {
    let tab = Sheet;
    let splitTab = [], final = [];
    let finalSudoku = '<br> ' + 'Sudoku to solve' + ' <br> ' + '<br> ';
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
    return finalSudoku;

}

module.exports = browserPrettyPrint;
