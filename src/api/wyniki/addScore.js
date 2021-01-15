async function addScore(req, res, wyniki, zalogowanyGracz) {
    const today = new Date();
    const timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const nowedane =  await wyniki.query().insert({
        gracz: zalogowanyGracz,
        poziomtrudnosci: req.body.poziomtrudnosci,
        data: timestamp,
        wynik: req.body.wynik
    });
    res.status(201).send(nowedane);
}
module.exports = addScore;