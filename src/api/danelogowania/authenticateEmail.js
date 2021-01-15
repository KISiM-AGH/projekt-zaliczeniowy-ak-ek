const TakenError = require("../../exceptions/taken-error");

async function authenticateEmail(email, danelogowania) {
    const dane = await danelogowania.query().select("email").from("danelogowania").where("email", email);
    if(dane.length > 0)
        throw new TakenError("This email is taken!");
}
module.exports = authenticateEmail;