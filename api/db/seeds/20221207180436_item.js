/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('item').del()
  await knex('item').insert([
    {id: 1, user_id: 2, item_name: "rowValue1", description: "", quantity: 111},
    {id: 2, user_id: 1, item_name: "rowValue2", description: "", quantity: 111}
  ]);
};