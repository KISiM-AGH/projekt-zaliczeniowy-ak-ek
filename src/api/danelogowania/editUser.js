const NoDataFoundError = require("../../exceptions/no-data-found-error");
const shortData = require("./shortData");
const authenticateEmail = require("./authenticateEmail");
const authenticateNick = require("./authenticateNick");

async function editUser (req, res, danelogowania) {
    const id = req.user._id;
    if(req.body.email !== undefined)
        await authenticateEmail(req.body.email, danelogowania);
    if(req.body.nick !== undefined)
        await authenticateNick(req.body.nick, danelogowania);
    const nowedane =  await danelogowania.query().patchAndFetchById(id, req.body);
    if(nowedane === undefined)
        throw new NoDataFoundError();
    res.status(201).send(shortData(nowedane));
}

module.exports = editUser;