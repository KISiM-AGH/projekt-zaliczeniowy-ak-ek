const config = require("../../../config");

function logout (res) {
    res.cookie('auth', 'wrong-data', config.makeCookieExpire);
    res.status(200).send('You were logged out!')
}

module.exports = logout;