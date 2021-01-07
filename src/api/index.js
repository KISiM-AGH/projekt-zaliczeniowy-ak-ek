const {Router} = require('express')
const danelogowaniaRouter = require('./danelogowania/danelogowania.controller')
const router = new Router();

router.use('/danelogowania', danelogowaniaRouter)

module.exports = router;
