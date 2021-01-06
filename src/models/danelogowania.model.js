const {Model} = require('objection')
const knex = require('../knex')

Model.knex(knex);

class danelogowania extends Model {
    static get tableName() {
        return 'danelogowania';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                //id: {type: 'integer'},
                nick: {type: 'string'},
                email: {type: 'string'},
                passwd: {type: 'string'}
            }
        }
    }
    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);
        delete json.id;
        return json;
    }
}

module.exports = danelogowania;