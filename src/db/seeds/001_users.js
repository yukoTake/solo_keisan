/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const table="users"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    {id: 1, name: 'pochi', password:"111"},
    {id: 2, name:  'taro', password:"222"},
    {id: 3, name: 'hanako', password:"333"}
  ]);
};
