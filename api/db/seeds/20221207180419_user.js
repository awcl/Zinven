/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('item').del();
  await knex('user').del();
  await knex('user').insert([
    {id: 1, first_name: 'Helio', last_name: 'Sphere', username: 'gcan8', password_hash: '$2b$12$/PdDxfNcLeGf6Cgg09EkcOG2bfv3rhAGOjkfwSLyGvhN9eZGsRvOu'},
    {id: 2, first_name: 'Test', last_name: 'Testington', username: 'test', password_hash: '$2b$12$zKGlDAgkc9bDq/iZWexf3eG8NgNTLMOZt3c16YYMORFHELz8h7sZi'},
    {id: 3, first_name: 'Nata', last_name: 'Nana', username: 'helpimtrappedinadatabase', password_hash: '$2y$12$M2TYbcuJV0GHUXTyCAcLLuclLAfu6JKfuhBVpOZ9diP6iJfvhOY/y'},
    {id: 4, first_name: 'Anzsor', last_name: 'Alisa-Daviti', username: 'yolo', password_hash: '$2y$12$hig73jSR/ccryE0pNivX7.SqN4DeovW1jXK7Drnq9QxxIKQgiTnA6'}
  ]);
};