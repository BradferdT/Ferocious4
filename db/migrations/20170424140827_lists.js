
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists', function(table){
    table.increments();
    table.string('list_name');
    table.string('user_id').notNullable();
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists');
};
