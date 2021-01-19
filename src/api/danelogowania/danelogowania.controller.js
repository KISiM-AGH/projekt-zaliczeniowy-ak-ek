const argon2 = require('argon2')
const authenticateNick = require("./authenticateNick");

const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const asyncHandler = require("../../middleware/asyncHandler");
const getUser = require("./getUser");
const addUser = require("./addUser");
const tryPassword = require('./tryPassword')
const editUser = require("./editUser");
const deleteUser = require("./deleteUser");
const {auth} = require("../../middleware/auth");

const router = new Router();

//welcome screen
router.get('/', asyncHandler ( (req, res) => {
    res.status(200).send("Welcome to danelogowania control panel!")
}))

//getting user information via id
router.get('/:id', auth({required: true}),  asyncHandler(async ( req, res) => {
    await getUser(req, res, danelogowania);
}))

//adding a new user
router.post('/', asyncHandler( async (req, res) => {
    await addUser(req, res, danelogowania);
}))

//checking input password with database password via nick
router.post('/login', asyncHandler(async (req, res) => {
        await tryPassword(req, res, danelogowania);
}))

//updating user via id
router.put('/:id', auth({required: true}), asyncHandler(async (req, res) => {
        await editUser(req, res, danelogowania);
}))

//deleting user via id
//poprawić
router.delete('/', auth({required: true}), asyncHandler(async (req, res) => {
        await deleteUser(req, res, danelogowania);
}))

module.exports = router;