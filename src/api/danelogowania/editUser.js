const NoDataFoundError = require("../../exceptions/no-data-found-error");
const shortData = require("./shortData");


async function editUser (req, res, danelogowania) {
    const id = req.params.id;
    const nowedane =  await danelogowania.query().patchAndFetchById(id, req.body);
    if(nowedane === undefined)
        throw new NoDataFoundError();
    res.status(201).send(shortData(nowedane));
}
module.exports = editUser;