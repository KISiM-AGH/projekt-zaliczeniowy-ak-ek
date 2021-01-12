const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

const roles = ['user', 'admin'];

class danelogowania extends Model {
    static get tableName() {
        return 'danelogowania';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                nick: {type: 'string'},
                email: {
                    type: String, //or 'string'
                    match: /^\S+@\S+\.\S+$/, //sprawdzanie czy wprowadzony email pasuje do wzoru email
                    unique: true, //email musi identyfikować uzytkownika
                    trim: true, //usuwanie spacji przed czy po emailu
                    lowercase: true, //ustawianie wszystkich liter na małe
                    index: true // ??????? pole indeksowane po stronie bazy danych ???????
                },
                passwd: {
                    //do haszowania używamy argon2 (yarn add argon2)
                    type: String, //or 'string'
                    required: true,
                    minlength: 4  // ??????? czy ustawiamy minimalną długość hasła
                    // kb mówi że to w sumie niepotrzebne bo i tak będziemy je haszować ???????
                },
                // role w systemie- mówi że ważne ale nie wiem jeszcze czy nam to potrzebne
                role: {
                    type: String,
                    default: 'user'
                }
            }
        }
    }
    static get view(){
        const {_id, name, email} = this;
        return{
            _id, name, email,
        }
    }
    // !!!!! tutaj haszowanie ale nie wiem jak je napisać u nas (27:32)
    //static void (){
        //if(!this.isModified('passwd')) return next();
        //argon2.hash(this.passwd, {type: argon2.argon2id}).then((hash) => {
        //next()
    //}).catch(next)
    //}
    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);
        delete json.id;
        return json;
    }
}

module.exports = danelogowania;