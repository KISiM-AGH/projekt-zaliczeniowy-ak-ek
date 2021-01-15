const tryPassword = require("./tryPassword");

async function deleteUser(req, res, danelogowania) {
    const id = req.params.id;
    await tryPassword(req, res, danelogowania);
    const dane = await danelogowania.query().deleteById(id);
    res.status(200).send("Usunieto uzytkownika");
}
module.exports = deleteUser;