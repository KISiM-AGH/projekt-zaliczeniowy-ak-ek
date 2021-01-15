const NoDataFoundError = require("../../exceptions/no-data-found-error");

async function deleteScore(req, res, wyniki) {
    const dane = await wyniki.query().deleteById(req.params.id);
    if(dane === 0)
        res.status(400).send("Nie ma takiego wyniku");
    else
        res.status(200).send("Usunieto wynik ");
}
module.exports = deleteScore;