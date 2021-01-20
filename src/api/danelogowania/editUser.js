const NoDataFoundError = require("../../exceptions/no-data-found-error");
const shortData = require("./shortData");
const argon2 = require('argon2');
const authenticateEmail = require("./authenticateEmail");
const authenticateNick = require("./authenticateNick");
const InvalidDataPassedException = require("../../exceptions/invalid-data-passed-exception");

async function editUser (req, res, danelogowania) {
    const id = req.user._id;
    if(req.body.email !== undefined)
        await authenticateEmail(req.body.email, danelogowania);
    if(req.body.nick !== undefined)
        await authenticateNick(req.body.nick, danelogowania);
    const dane = await danelogowania.query().select().from("danelogowania").where("id", req.user._id);
    console.log(dane);
    if(req.body.passwd !== undefined)
        if ( await argon2.verify(dane[0].passwd, req.body.passwd) )
            throw new InvalidDataPassedException();
        else
            req.body.passwd = await argon2.hash(req.body.passwd);
    const nowedane =  await danelogowania.query().patchAndFetchById(id, req.body);
    if(nowedane === undefined)
        throw new NoDataFoundError();
    res.status(201).send(shortData(nowedane));
}

module.exports = editUser;