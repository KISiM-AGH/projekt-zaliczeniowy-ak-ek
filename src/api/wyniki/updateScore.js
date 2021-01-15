const NoDataFoundError = require("../../exceptions/no-data-found-error");

async function updateScore(req, res, wyniki) {
    const id = req.params.id;
    const nowedane =  await wyniki.query().patchAndFetchById(id, req.body);
    if(nowedane.length === 0)
        throw new NoDataFoundError();
    res.status(201).send(nowedane);
}
module.exports = updateScore;