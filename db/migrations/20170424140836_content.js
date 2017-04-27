
exports.up = function(knex, Promise) {
  return knex.schema.createTable('content', function(table){
    table.increments();
    table.integer('list_id').notNullable();
    table.integer('walmart_id');
    table.text('item_name', 'longtext').notNullable();
    table.text('category_path', 'longtext');
    table.float('sale_price');
    table.text('description', 'longtext');
    table.text('thumbnail_image', 'longtext');
    table.text('medium_image', 'longtext');
    table.text('large_image', 'longtext');
    table.text('product_url', 'longtext');
    table.text('customer_rating');
    table.boolean('available_online');
    table.boolean('completed').defaultTo(false);
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('content');
};
