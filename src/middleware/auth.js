const jwt = require('jsonwebtoken');
const config = require('../../config');
const UnauthorizedException = require("../exceptions/unauthorized-exception");

// funkcja opakowująca- zwraca funkcję ??
const auth = ({required} = {}) => (req, res, next) => {
    const token = req.cookies.auth;
    if(required && !token) throw new UnauthorizedException();
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch {
        throw new UnauthorizedException('Wrong token');
    };

    const user_id = {
        _id: decodedToken.sub
    };
    req.user = user_id;
    next();
};

module.exports = {
    auth
};