const {Router} = require('express')
const wyniki = require('../../models/wyniki.model')
const asyncHandler = require("../../middleware/asyncHandler");
const getScoreByPlayerId = require("./getScores");
const addScore = require("./addScore");
const updateScore = require("./updateScore");
const deleteScore = require("./deleteScore");
const getScores = require("./getScores");
const {auth} = require("../../middleware/auth");
const router = new Router();

//welcome screen
router.get('/', (req, res) => {
    res.status(200).send(msg());
})

//getting all scores for current user, requires authorization, throws NoScores
router.get('/myscores', auth({required: true}), asyncHandler(async (req, res) => {
    await getScores(req, res, wyniki);
}))

module.exports = router;













function msg(){
    let msg = '<br>' + '<h1> Welcome to wyniki panel! </h1>' + '<br>';
    msg = msg + 'Results ' + '<button> <a href="http://127.0.0.1:3198/api/wyniki/myscores">click!</a> </button>' + '<br>' + '<br>';
    return msg;
}