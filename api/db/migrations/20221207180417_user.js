/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.string('username', 50).notNullable().unique();
    table.string('password_hash').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
