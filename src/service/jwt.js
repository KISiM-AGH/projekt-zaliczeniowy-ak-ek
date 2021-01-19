const jwt = require('jsonwebtoken');
const config = require('../../config');
//id-identyfikator użytkowanika z bazy danych, ?? rola ??
function sign (id/*, role*/) {
    return jwt.sign({sub: id/*, role*/}, config.jwtSecret, {expiresIn: '1 day'});
}

module.exports = sign;