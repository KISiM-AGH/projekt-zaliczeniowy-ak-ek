const jwt = require('jsonwebtoken');
const config = require('../../config');
const UnauthorizedException = require("../exceptions/no-authorization-error");

const auth = ({required} = {}) => (req, res, next) => {
    const token = req.cookies.auth;
    if(required && !token) throw new UnauthorizedException();
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, config.jwtSecret);
    } catch {
        throw new UnauthorizedException('Wrong token');
    };

    req.user = {
        _id: decodedToken.sub
    };
    next();
};

module.exports = {
    auth
};