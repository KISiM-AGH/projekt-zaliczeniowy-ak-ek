const tryPassword = require("./tryPassword");

async function deleteUser(req, res, danelogowania) {
    const id = req.params.id;
    await tryPassword(req, res, danelogowania);
    const dane = await danelogowania.query().deleteById(req.params.id);
    res.status(200).send("User has been deleted");
}
module.exports = deleteUser;