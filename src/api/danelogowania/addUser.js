const argon2 = require('argon2')
const shortData = require('./shortData');
const authenticateEmail = require('./authenticateEmail');
const authenticateNick = require('./authenticateNick');
const sign = require('../../service/jwt');
const config = require("../../../config");

async function addUser(req, res, danelogowania) {
    await authenticateEmail(req.body.email, danelogowania);
    await authenticateNick(req.body.nick, danelogowania);
    const nowedane = await danelogowania.query().insert({
        nick: req.body.nick,
        email: req.body.email,
        passwd: await argon2.hash(req.body.passwd)
    });
    //console.log(nowedane);
    const token = sign(nowedane.id);
    //console.log(token);
    res.cookie('auth', token, config.cookiesOptions);
    res.status(201).send(shortData(nowedane));
}

module.exports = addUser;