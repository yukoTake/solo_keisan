/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "users";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  await knex(table).insert([
    { id: 1, name: "pochi", password: "111", timestamp: new Date() },
    { id: 2, name: "taro", password: "222", timestamp: new Date() },
    { id: 3, name: "hanako", password: "333", timestamp: new Date() },
  ]);
};
