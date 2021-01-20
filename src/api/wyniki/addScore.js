const config = require("../../../config");

async function addScore(req, res, wyniki) {
    const today = new Date();
    const timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let solvingHour = (today.getHours() - parseInt(req.cookies.sudokuStartTime[0] + req.cookies.sudokuStartTime[1]));
    let solvingMinute = (today.getMinutes() - parseInt(req.cookies.sudokuStartTime[3] + req.cookies.sudokuStartTime[4]));
    let solvingSecond = (today.getSeconds() - parseInt(req.cookies.sudokuStartTime[6] + req.cookies.sudokuStartTime[7]));
    if(solvingSecond < 0) solvingSecond = (60+solvingSecond);
    if(solvingMinute < 0) solvingMinute = (60+solvingMinute);
    if(solvingHour < 0) solvingHour = (12+solvingHour);
    if(solvingSecond < 10) solvingSecond = '0'+(solvingSecond).toString();
    if(solvingMinute < 10) solvingMinute = '0'+(solvingMinute).toString();
    if(solvingHour < 10) solvingHour = '0'+(solvingHour).toString();
    const solvingTime = solvingHour +':'+ solvingMinute +':'+ solvingSecond;
    let level;
    if(parseInt(req.cookies.sudokuLevel) === 0)
        level = "easy";
    else if (parseInt(req.cookies.sudokuLevel) === 1)
        level = 'medium';
    else if (parseInt(req.cookies.sudokuLevel) === 2)
        level = 'hard';

    const nowedane =  await wyniki.query().insert({
        data: timestamp,
        gracz: req.user._id,
        poziomtrudnosci: level,
        wynik: solvingTime
    });
    const dane = await wyniki.query().select("wynik", "poziomtrudnosci").where("gracz", req.user._id).orderBy("wynik");
    const amount = dane.length;
    if(amount > 5) {
        await wyniki.query().delete().where("wynik", dane[amount-1].wynik);
        console.log('deleted some')
    }
    if( req.body.row1 !== "sudokuTest" ) {
        res.cookie('sudokuStartTime', 'no-data', config.makeCookieExpire);
        res.cookie('sudokuLevel', 'no-data', config.makeCookieExpire);
        res.cookie('controlSum', 'no-data', config.makeCookieExpire);
    }
    res.status(201).send("You have solved the puzzle! Your score is : "+'<br>'+nowedane.wynik);
}
module.exports = addScore;