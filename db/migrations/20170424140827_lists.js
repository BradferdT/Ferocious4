
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists', function(table){
    table.increments();
    table.string('list_name');
    table.integer('user_id').notNullable();
    table.boolean('completed').defaultTo(false);
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists');
};
