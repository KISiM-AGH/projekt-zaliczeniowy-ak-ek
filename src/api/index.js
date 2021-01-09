const {Router} = require('express')
const danelogowaniaRouter = require('./danelogowania/danelogowania.controller')
const wynikiRouter = require('./wyniki/wyniki.controller')
const sudokuRouter = require('./sudoku/sudoku.controller.js')
const router = new Router();

router.use('/danelogowania', danelogowaniaRouter)
router.use('/wyniki', wynikiRouter)
router.use('/sudoku', sudokuRouter)

module.exports = router;
