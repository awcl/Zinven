/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex('item').del()
  await knex('item').insert([
    {id: 1, user_id: 1, item_name: "Long Text Printoff", description: "We've been trying to reach you concerning your vehicle's extended warranty. You should've received a notice in the mail about your car's extended warranty eligibility. Since we've not gotten a response, we're giving you a final courtesy call before we close out your file. Press 2 to be removed and placed on our do-not-call list. To speak to someone about possibly extending or reinstating your vehicle's warranty, press 1 to speak with a warranty specialist.", quantity: "11"},
    {id: 2, user_id: 2, item_name: "3D0 Sew On Ocupational Badge", description: "Item conforms to current OCP uniform standards", quantity: "53"},
    {id: 3, user_id: 1, item_name: "5C0 Sew On Ocupational Badge", description: "Item conforms to current OCP uniform standards", quantity: "74"},
    {id: 4, user_id: 4, item_name: "Exhaust Sample", description: "Painstakingly collected in trashbags -- I feel light headed", quantity: "2"},
    {id: 5, user_id: 2, item_name: "Coffee", description: "Whole bean and won't taste burnt like Starbucks does", quantity: "565"},
    {id: 6, user_id: 3, item_name: "Exhaust Sample", description: "Painstakingly collected in trashbags -- I feel light headed", quantity: "2"}
  ]);
};