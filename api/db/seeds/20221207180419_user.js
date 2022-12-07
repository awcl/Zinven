/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'rowValue1', last_name: 'rowValue1', username: 'rowValue1', password_hash: 'rowValue1'},
    {id: 2, first_name: 'rowValue2', last_name: 'rowValue2', username: 'rowValue2', password_hash: 'rowValue2'}
  ]);
};