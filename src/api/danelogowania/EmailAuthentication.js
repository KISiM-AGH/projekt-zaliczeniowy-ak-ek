const TakenError = require('../../exceptions/taken-error')
async function authenticateNick(nick, danelogowania) {
    const dane = await danelogowania.query().select("nick").from("danelogowania").where("nick", nick);
    //if(!(dane[0] === undefined)) {
    if(dane.length > 0)  {
        throw new TakenError("This nick is taken");
    }
}
module.exports = authenticateNick;
