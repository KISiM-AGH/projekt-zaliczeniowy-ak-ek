const {Model} = require('objection')
const knex = require('../knex')

Model.knex(knex);

class wyniki extends Model {
    static get tableName() {
        return 'wyniki';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: {type: 'integer'},
                gracz: {type: 'integer'},
                poziomtrudnosci: {type: 'string'},
                data: {type: 'string'},
                wynik: {type: 'string'}
            }
        }
    }
    $formatDatabaseJson(json) {
        json = super.$formatDatabaseJson(json);
        delete json.id;
        return json;
    }
}
module.exports = wyniki