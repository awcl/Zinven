/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'Georg', last_name: 'Cantor', username: 'gcan8', password_hash: 'TODO'}
  ]);
};