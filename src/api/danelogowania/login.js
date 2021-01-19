const NoDataFoundError = require("../../exceptions/no-data-found-error");
const argon2 = require('argon2');
const sign = require("../../service/jwt");
const config = require("../../../config");
const InvalidDataPassedException = require("../../exceptions/invalid-data-passed-exception");

async function login(req, res, danelogowania) {
    if(req.body.nick === undefined || req.body.passwd === undefined)
        throw new NoDataFoundError();
    const dane = await danelogowania.query().select().from("danelogowania").where("nick", req.body.nick.toString());
    if(dane.length === 0)
        throw new InvalidDataPassedException();
    if ( await argon2.verify(dane[0].passwd, req.body.passwd.toString())) {
        const token = sign(dane[0].id);
        res.cookie('auth', token, config.cookiesOptions);
        return true;
    } else {
        res.cookie('auth', 'wrong-data', config.makeCookieExpire);
        return false;
    }
}
module.exports = login;