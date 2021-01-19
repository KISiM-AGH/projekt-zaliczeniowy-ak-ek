const NoScoresError = require("../../exceptions/no-scores-error");

async function getScores(req, res, wyniki) {
    const id = req.user._id;
    const dane = await wyniki.query().select("wynik", "poziomtrudnosci").where("gracz", id);
    if(dane.length === 0)
        throw new NoScoresError();
    res.send(dane);
}
module.exports = getScores;