/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('user.id');
    table.string('item_name', 50).notNullable();
    table.string('description', 500).notNullable();
    table.integer('quantity').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('user_id');
  }).then(function() {
    return knex.schema.dropTableIfExists('item');
  });
};
