const NoDataFoundError = require("../../exceptions/no-data-found-error");

async function getScoreByPlayerId(req, res, wyniki) {
    const id = req.params.id;
    const dane = await wyniki.query().select("wynik", "poziomtrudnosci").where("id", req.params.id);
    if(dane.length === 0)
        throw new NoDataFoundError();
    res.send(dane);
}
module.exports = getScoreByPlayerId;