const shortData = require("./shortData");
const NoDataFoundError = require("../../exceptions/no-data-found-error");
const asyncHandler = require("../../middleware/asyncHandler");


async function getUser( req, res, danelogowania) {
    const id = req.params.id;
    const dane = await danelogowania.query().select().from("danelogowania").where("id", id);
    if(dane.length === 0)
        throw new NoDataFoundError();
    res.status(200).send(shortData(dane[0]));
}
module.exports = getUser;