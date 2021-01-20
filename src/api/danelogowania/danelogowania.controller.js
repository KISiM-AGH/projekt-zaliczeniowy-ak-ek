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
    res.status(200).send(msg());
})

//getting basic user information, requires authorization, throws NoDataFound | NoLogin
router.get('/mydata', auth({required: true}),  asyncHandler(async ( req, res) => {
    await getUser(req, res, danelogowania);
}));

//adding a new user, triggers authorization, throws InvalidDataPassed
router.post('/', asyncHandler( async (req, res) => {
    await addUser(req, res, danelogowania);
}))

//checking input password with database password via nick, triggers authorization, throws NoDataFound | InvalidDataPassed
router.get('/login', asyncHandler(async (req, res) => {
        if( await login(req, res, danelogowania) === true)
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







function msg(){
    let msg = '<br>' + '<h1> Welcome to danelogowania control panel! </h1>' + '<br>';
    msg = msg + 'Registration at: (POST) http://localhost/api/danelogowania/' + '<br>' + '<br>';
    msg = msg + 'Login at: (GET) http://localhost/api/danelogowania/login' + '<br>' + '<br>';
    msg = msg + 'Information about account ' + '<button> <a href="http://127.0.0.1:3198/api/danelogowania/mydata">click!</a> </button>' + '<br>' + '<br>';
    msg = msg + 'Generate sudoku ' + '<button> <a href="http://127.0.0.1:3198/api/sudoku/">click!</a> </button>' + '<br>' + '<br>';
    msg = msg + 'Logout ' + '<button> <a href="http://127.0.0.1:3198/api/danelogowania/logout">click!</a> </button>' + '<br>' + '<br>';
    msg = msg + 'Update your account data at: (PUT) http://localhost/api/danelogowania/' + '<br>' + '<br>';
    msg = msg + 'Delete account at: (DELETE) http://localhost/api/danelogowania/' + '<br>' + '<br>';
    return msg;
}