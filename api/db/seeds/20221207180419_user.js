/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('user').del()
  await knex('user').insert([
    {id: 1, first_name: 'Georg', last_name: 'Cantor', username: 'gcan8', password_hash: '$2b$12$/PdDxfNcLeGf6Cgg09EkcOG2bfv3rhAGOjkfwSLyGvhN9eZGsRvOu'},
    {id: 2, first_name: 'Test', last_name: 'Testington', username: 'testUser', password_hash: '$2b$12$zKGlDAgkc9bDq/iZWexf3eG8NgNTLMOZt3c16YYMORFHELz8h7sZi'}
  ]);
};