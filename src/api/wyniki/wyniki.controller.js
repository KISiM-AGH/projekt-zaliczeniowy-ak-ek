const {Router} = require('express')
const wyniki = require('../../models/wyniki.model')
const NoDataFoundError = require("../../exceptions/no-data-found-error");
const router = new Router();
const zalogowanyGracz = 1;
router.get('/', (req, res) => {
    const dane = wyniki.query();
    res.send(dane);
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dane = await wyniki.query().findById(id);
        if(!dane) throw new NoDataFoundError();
        res.send(dane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.post('/', async (req, res) => {
    try {
        const today = new Date();
        const timestamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+" "+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(timestamp);
        const nowedane =  await wyniki.query().insert({
            gracz: zalogowanyGracz,
            poziomtrudnosci: req.body.poziomtrudnosci,
            data: timestamp,
            wynik: req.body.wynik
        });
        res.status(201).send(nowedane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nowedane =  await wyniki.query().patchAndFetchById(id, req.body);
        res.status(201).send(nowedane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const dane = await wyniki.query().deleteById(id);
        if(dane == 0) throw new NoDataFoundError();
        res.status(204).send("usunieto "+dane);
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

module.exports = router;
