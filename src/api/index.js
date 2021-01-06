const {Router} = require('express')
const danelogowaniaRouter = require('../api/danelogowania/danelogowania.controller')
const router = new Router();

router.use('/danelogowania', danelogowaniaRouter)

module.exports = router;
