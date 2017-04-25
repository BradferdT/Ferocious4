
exports.up = function(knex, Promise) {
  return knex.schema.createTable('content', function(table){
    table.increments();
    table.integer('list_id').notNullable();
    table.integer('walmart_id');
    table.string('item_name').notNullable();
    table.string('category_path');
    table.integer('sale_price');
    table.string('description');
    table.string('thumbnail_image');
    table.string('medium_image');
    table.string('large_image');
    table.string('product_url');
    table.string('customer_rating');
    table.boolean('available_online');
    table.boolean('completed').defaultTo(false);
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {

};
