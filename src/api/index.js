const {Router} = require('express')
const danelogowaniaRouter = require('./danelogowania/danelogowania.controller')
const wynikiRouter = require('./wyniki/wyniki.controller')
const router = new Router();

router.use('/danelogowania', danelogowaniaRouter)
router.use('/wyniki', wynikiRouter)

module.exports = router;
