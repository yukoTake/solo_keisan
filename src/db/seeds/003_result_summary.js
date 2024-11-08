/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="result_summary"
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(table).del()
  await knex(table).insert([
    {id: 1, parameter_id:1, time:10, miss_count: 1, date:new Date()},
    {id: 2, parameter_id:1, time:8, miss_count: 1, date:new Date()},
    {id: 3, parameter_id:2, time:15,  miss_count: 1,date:new Date()},
  ]);
};
