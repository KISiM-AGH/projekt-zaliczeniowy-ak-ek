const argon2 = require('argon2')
const authenticateNick = require("./authenticateNick");

const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const NoDataFoundError = require("../../exceptions/no-data-found-error");
const TakenError = require("../../exceptions/taken-error");
const asyncHandler = require("../../middleware/asyncHandler");
const welcomeScreen = require("./welcomeScreen");
const getUser = require("./getUser");
const addUser = require("./addUser");
const tryPassword = require('./tryPassword')
const editUser = require("./editUser");
const deleteUser = require("./deleteUser");

const router = new Router();



router.get('/', asyncHandler ( (req, res) => {
    welcomeScreen(req, res, danelogowania);
}))

router.get('/:id',  asyncHandler(async ( req, res) => {
    await getUser(req, res, danelogowania);
}))

router.post('/', asyncHandler( async (req, res) => {
    await addUser(req, res, danelogowania);
}))

router.post('/login', asyncHandler(async (req, res) => {
        await tryPassword(req, res, danelogowania);
}))

router.put('/:id', asyncHandler(async (req, res) => {
        await editUser(req, res, danelogowania);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
        await deleteUser(req, res, danelogowania);
}))

module.exports = router;












