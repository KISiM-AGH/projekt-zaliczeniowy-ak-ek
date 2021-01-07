const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const router = new Router();

router.get('/', (req, res) => {
    const dane = danelogowania.query();
    res.send(dane);
})

router.get('/:id', (req, res) => {

})

router.post('/', async (req, res) => {
    try {
        const nowedane =  await danelogowania.query().insert({
            nick: req.body.nick,
            email: req.body.email,
            passwd: req.body.passwd
        });
        res.send(nowedane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;
