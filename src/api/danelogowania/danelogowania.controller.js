const argon2 = require('argon2')
const authenticateNick = require("./EmailAuthentication");

const {Router} = require('express')
const danelogowania = require('../../models/danelogowania.model')
const NoDataFoundError = require("../../exceptions/no-data-found-error");
const TakenError = require("../../exceptions/taken-error");

const router = new Router();



router.get('/', (req, res) => {
    try {
        const dane = danelogowania.query();

        if(dane == null)
        {
            throw new NoDataFoundError();
        }
        res.status(200).send({msg: "Witaj w panelu danych logowania"});
    } catch (e)
    {
        res.status(404).send("Nothing found here");
    }


})

router.get('/:id', async (req, res) => {
    //try {
        const id = req.params.id;
        const dane = await danelogowania.query().select().from("danelogowania").where("id", id);
        console.log(dane);
        /*if(dane[0] === undefined)
            throw new NoDataFoundError();*/
        //res.status(200).send(shortData(dane[0]));
    /*} catch (error) {
        res.status(400).send({msg: "co jest nie tak: " + error})
    }*/
})

router.post('/', async (req, res) => {
    try {
        await authenticateEmail(req.body.email, danelogowania);
        await authenticateNick(req.body.nick, danelogowania);
        const nowedane =  await danelogowania.query().insert({
            nick: req.body.nick,
            email: req.body.email,
            passwd: await argon2.hash(req.body.passwd)
        });
        res.status(201).send(shortData(nowedane));
    } catch (error) {
        res.send({msg: "co jest nie tak: " + error})
    }
})

router.post('/login', async (req, res) => {
    try {
        const dane = await danelogowania.query().select("passwd").from("danelogowania").where("nick", req.body.nick.toString());
        if(dane[0] === undefined)
            throw new NoDataFoundError();
        if ( await argon2.verify(dane[0].passwd, req.body.passwd.toString()) )
            res.status(200).send({msg: "dobre haslo"})
        else
            res.status(400).send({msg: "zle haslo"})
    } catch (error) {
        res.status(400).send({msg: "Co jest nie tak: " + error})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nowedane =  await danelogowania.query().patchAndFetchById(id, req.body);
        if(nowedane[0] == undefined)
            throw new NoDataFoundError();
        res.status(201).send(nowedane);
    } catch (error) {
        res.status(400).send({msg: "Co jest nie tak: " + error})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dane = await danelogowania.query().deleteById(id);
        res.status(204).send({msg:"usunieto "+dane});
    } catch (error) {
        res.status(400).send({msg: "co jest nie tak: " + error})
    }
})

module.exports = router;









async function authenticateEmail(email, danelogowania) {
    const dane = await danelogowania.query().select("email").from("danelogowania").where("email", email);
    console.log(dane);
    if(!(dane[0] === undefined)) {
        throw new TakenError("This email is taken!");
    }
}

function shortData(dane) {
    const outcome = "Email: "+dane.email+ '<br>' +"Nick: "+dane.nick;
    return outcome;
}
module