async function addScore(req, res, wyniki) {
    const today = new Date();
    const timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let solvingHour = (today.getHours() - parseInt(req.cookies.sudokuStartTime[0] + req.cookies.sudokuStartTime[1]));
    let solvingMinute = (today.getMinutes() - parseInt(req.cookies.sudokuStartTime[3] + req.cookies.sudokuStartTime[4]));
    let solvingSecond = (today.getSeconds() - parseInt(req.cookies.sudokuStartTime[6] + req.cookies.sudokuStartTime[7]));
    if(solvingSecond < 0) solvingSecond = (-solvingSecond);
    if(solvingMinute < 0) solvingMinute = (-solvingMinute);
    if(solvingHour < 0) solvingHour = (-solvingHour);
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
    res.status(201).send("You have solved the puzzle! Your score is : "+'<br>'+nowedane.wynik);
}
module.exports = addScore;