const NoDataFoundError = require("../../exceptions/no-data-found-error");
const argon2 = require('argon2');
const sign = require("../../service/jwt");
const config = require("../../../config");

async function tryPassword(req, res, danelogowania) {
    const dane = await danelogowania.query().select("passwd").from("danelogowania").where("nick", req.body.nick.toString());
    if(dane.length === 0)
        throw new NoDataFoundError();
    if ( await argon2.verify(dane[0].passwd, req.body.passwd.toString())) {
        const token = sign(dane[0].id);
        res.cookie('auth', token, config.cookiesOptions);
        res.status(200).send("Autoryzacja zakończona sukcesem");
    } else
        res.status(400).send("Autoryzacja zakończona niepowodzeniem");
}
module.exports = tryPassword;