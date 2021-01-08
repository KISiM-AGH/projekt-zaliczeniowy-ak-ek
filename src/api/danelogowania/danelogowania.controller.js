const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const NoDataFoundError = require("../../exceptions/no-data-found-error");
const router = new Router();

router.get('/', (req, res) => {
    const dane = danelogowania.query();
    res.send(dane);
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dane = await danelogowania.query().findById(id);
        if(!dane) throw new NoDataFoundError();
        res.send(dane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.post('/', async (req, res) => {
    try {
        const nowedane =  await danelogowania.query().insert({
            nick: req.body.nick,
            email: req.body.email,
            passwd: req.body.passwd
        });
        res.status(201).send(nowedane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nowedane =  await danelogowania.query().patchAndFetchById(id, req.body);
        res.status(201).send(nowedane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const dane = await danelogowania.query().deleteById(id);
        if(dane == 0) throw new NoDataFoundError();
        res.status(204).send("usunieto "+dane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

module.exports = router;
