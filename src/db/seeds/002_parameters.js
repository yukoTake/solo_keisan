/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "parameters";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  await knex(table).insert([
    {
      id: 1,
      user_id: 1,
      arg1_min: 0,
      arg1_max: 10,
      arg1_decimal: 0,
      arg1_list: null,
      arg2_min: 0,
      arg2_max: 10,
      arg2_decimal: 0,
      arg2_list: null,
      operator: "+",
      res_min: 0,
      res_max: 20,
      add_date: new Date(),
    },
    {
      id: 2,
      user_id: 1,
      arg1_min: 0,
      arg1_max: 100,
      arg1_decimal: 0,
      arg1_list: null,
      arg2_min: 0,
      arg2_max: 50,
      arg2_decimal: 0,
      arg2_list: null,
      operator: "+",
      res_min: 0,
      res_max: 100,
      add_date: new Date(),
    },
  ]);
};
