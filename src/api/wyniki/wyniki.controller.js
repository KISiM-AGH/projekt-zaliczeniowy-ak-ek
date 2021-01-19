const {Router} = require('express')
const wyniki = require('../../models/wyniki.model')
const asyncHandler = require("../../middleware/asyncHandler");
const getScoreByPlayerId = require("./getScoreByPlayerId");
const addScore = require("./addScore");
const updateScore = require("./updateScore");
const deleteScore = require("./deleteScore");
const router = new Router();
//do usuniecia
const zalogowanyGracz = 1;

router.get('/', (req, res) => {
    res.status(200).send("Witaj w panelu wyników!");
})

//do poprawy
//auth
router.get('/:id', asyncHandler(async (req, res) => {
    await getScoreByPlayerId(req, res, wyniki);
}))

//auth
//through sudoku.validate
router.post('/', asyncHandler(async (req, res) => {
    await addScore(req, res, wyniki, zalogowanyGracz);
}))

//auth
router.put('/:id', asyncHandler(async (req, res) => {
    await updateScore(req, res, wyniki);
}))

//auth
router.delete('/:id', async (req, res) => {
    await deleteScore(req, res, wyniki);
})

module.exports = router;
