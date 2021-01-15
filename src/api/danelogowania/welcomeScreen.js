const NoDataFoundError = require("../../exceptions/no-data-found-error");


function welcomeScreen(req, res, danelogowania) {
    const dane = danelogowania.query();
    if(dane === undefined)
        throw new NoDataFoundError();
    res.status(200).send("Witaj w panelu danych logowania");
}
module.exports = welcomeScreen;