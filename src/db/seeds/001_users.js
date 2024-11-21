/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "users";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  await knex(table).insert([
    {  name: "pochi", password: "111", timestamp: new Date() },
    { name: "taro", password: "222", timestamp: new Date() },
    {  name: "hanako", password: "333", timestamp: new Date() },
  ]);
};
