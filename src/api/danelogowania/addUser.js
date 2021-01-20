const argon2 = require('argon2')
const shortData = require('./shortData');
const authenticateEmail = require('./authenticateEmail');
const authenticateNick = require('./authenticateNick');
const sign = require('../../service/jwt');
const config = require("../../../config");
const InvalidDataPassedException = require("../../exceptions/invalid-data-passed-exception");

async function addUser(req, res, danelogowania) {
    if(req.body.nick === undefined || req.body.email === undefined || req.body.passwd === undefined)
        throw new InvalidDataPassedException();
    //check if email/nick are not taken, throw Taken
    await authenticateEmail(req.body.email, danelogowania);
    await authenticateNick(req.body.nick, danelogowania);
    const nowedane = await danelogowania.query().insert({
        nick: req.body.nick,
        email: req.body.email,
        passwd: await argon2.hash(req.body.passwd)
    });
    const token = sign(nowedane.id);
    res.cookie('auth', token, config.cookiesOptions);
    res.status(201).send(shortData(nowedane));
}

module.exports = addUser;