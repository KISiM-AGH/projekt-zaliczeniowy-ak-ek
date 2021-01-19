const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const asyncHandler = require("../../middleware/asyncHandler");
const getUser = require("./getUser");
const addUser = require("./addUser");
const login = require('./login')
const editUser = require("./editUser");
const deleteUser = require("./deleteUser");
const logout = require("./logout");
const {auth} = require("../../middleware/auth");

const router = new Router();

//welcome screen
router.get('/',  (req, res) => {
    res.status(200).send("Welcome to danelogowania control panel!")
})

//getting basic user information, requires authorization, throws NoDataFound | NoLogin
router.get('/mydata', auth({required: true}),  asyncHandler(async ( req, res) => {
    await getUser(req, res, danelogowania);
}))

//adding a new user, triggers authorization
router.post('/', asyncHandler( async (req, res) => {
    await addUser(req, res, danelogowania);
}))

//checking input password with database password via nick, triggers authorization, throws NoDataFound | InvalidDataPassed
router.get('/login', asyncHandler(async (req, res) => {
        if( await login(req, res, danelogowania))
            res.status(200).send("Authorization passed!");
        else
            res.status(400).send("Authorization failed! Check your nick and password.");
}))

//checking input password with database password via nick, triggers authorization
router.get('/logout', (req, res) => {
    logout(res);
})

//updating user, throws NoDataFound
router.put('/', auth({required: true}), asyncHandler(async (req, res) => {
        await editUser(req, res, danelogowania);
}))

//deleting user, requires authorization and password confirmation
router.delete('/', auth({required: true}), asyncHandler(async (req, res) => {
        await deleteUser(req, res, danelogowania);
}))

module.exports = router;