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
    res.status(200).send("Welcome to wyniki panel!");
})

//getting all scores for current user, requires authorization, throws NoScores
router.get('/myscores', auth({required: true}), asyncHandler(async (req, res) => {
    await getScores(req, res, wyniki);
}))

//auth
router.delete('/:id', async (req, res) => {
    await deleteScore(req, res, wyniki);
})

module.exports = router;
