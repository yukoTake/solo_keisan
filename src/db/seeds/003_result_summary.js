/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "result_summary";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  await knex(table).insert([
    {
      id: 1,
      parameter_id: 1,
      time: 10,
      question_count: 10,
      correct_count: 9,
      timestamp: new Date(),
    },
    {
      id: 2,
      parameter_id: 1,
      time: 8,
      question_count: 10,
      correct_count: 9,
      timestamp: new Date(),
    },
    {
      id: 3,
      parameter_id: 2,
      time: 15,
      question_count: 10,
      correct_count: 9,
      timestamp: new Date(),
    },
  ]);
};
