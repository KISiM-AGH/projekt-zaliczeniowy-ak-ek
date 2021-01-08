
exports.up = function(knex) {
  return knex.schema.createTable('danelogowania', (table ) => {
      table.increments('id').primary();
      table.string('nick').notNullable();
      table.string('email').notNullable();
      table.string('passwd').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('danelogowania');
};
