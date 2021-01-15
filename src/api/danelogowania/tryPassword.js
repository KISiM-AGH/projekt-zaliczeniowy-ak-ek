const NoDataFoundError = require("../../exceptions/no-data-found-error");
const argon2 = require('argon2');

async function tryPassword(req, res, danelogowania) {
    const dane = await danelogowania.query().select("passwd").from("danelogowania").where("nick", req.body.nick.toString());
    console.log(dane);
    if(dane.length === 0)
        throw new NoDataFoundError();
    if ( await argon2.verify(dane[0].passwd, req.body.passwd.toString()) )
        res.status(200).send("Autoryzacja zakończona sukcesem");
    else
        res.status(400).send("Autoryzacja zakończona niepowodzeniem");
}
module.exports = tryPassword;