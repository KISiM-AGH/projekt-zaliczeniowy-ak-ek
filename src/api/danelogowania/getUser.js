const shortData = require("./shortData");
const NoDataFoundError = require("../../exceptions/no-data-found-error");

async function getUser( req, res, danelogowania) {
    const id = req.user._id;
    const dane = await danelogowania.query().select().from("danelogowania").where("id", id);
    if(dane.length === 0)
        throw new NoDataFoundError();
    res.status(200).send(shortData(dane[0]));
}
module.exports = getUser;