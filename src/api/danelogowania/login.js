const NoDataFoundError = require("../../exceptions/no-data-found-error");
const argon2 = require('argon2');
const sign = require("../../service/jwt");
const config = require("../../../config");

async function login(req, res, danelogowania) {
    const dane = await danelogowania.query().select().from("danelogowania").where("nick", req.body.nick.toString());
    console.log({msg:"nick w trypassword = "+dane[0].nick})
    if(dane.length === 0)
        throw new NoDataFoundError();
    if ( await argon2.verify(dane[0].passwd, req.body.passwd.toString())) {
        const token = sign(dane[0].id);
        res.cookie('auth', token, config.cookiesOptions);
        res.status(200).send("Authorization passed!");
    } else {
        res.cookie('auth', 'wrong-data', config.makeCookieExpire);
        res.status(400).send("Authorization failed! Check your nick and password.");
    }
}
module.exports = login;