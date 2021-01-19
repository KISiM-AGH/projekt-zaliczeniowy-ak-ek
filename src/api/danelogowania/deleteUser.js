const login = require("./login");
const config = require("../../../config");

async function deleteUser(req, res, danelogowania) {
    const id = req.user._id;
    await login(req, res, danelogowania);
    await danelogowania.query().deleteById(id);
    res.cookie('auth', 'wrong-data', config.makeCookieExpire);
    res.status(200).send("User has been deleted");
}
module.exports = deleteUser;