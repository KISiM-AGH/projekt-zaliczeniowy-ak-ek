const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const router = new Router();

router.get('/', (req, res) => {
    const dane = danelogowania.query();
    res.send(dane);
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;
