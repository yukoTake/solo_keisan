/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const data = [
  {
    summery_id: 1,
    question_no: 1,
    arg1: 3,
    arg2: 4,
    operator: "+",
    correct: 7,
    answered: 7,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 2,
    arg1: 3,
    arg2: 8,
    operator: "+",
    correct: 11,
    answered: 7,
    isCorrectly: false,
  },
  {
    summery_id: 1,
    question_no: 3,
    arg1: 3,
    arg2: 5,
    operator: "+",
    correct: 8,
    answered: 8,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 4,
    arg1: 3,
    arg2: 4,
    operator: "+",
    correct: 7,
    answered: 7,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 5,
    arg1: 3,
    arg2: 5,
    operator: "+",
    correct: 8,
    answered: 8,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 6,
    arg1: 3,
    arg2: 4,
    operator: "+",
    correct: 7,
    answered: 7,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 7,
    arg1: 3,
    arg2: 8,
    operator: "+",
    correct: 11,
    answered: 7,
    isCorrectly: false,
  },
  {
    summery_id: 1,
    question_no: 8,
    arg1: 3,
    arg2: 5,
    operator: "+",
    correct: 8,
    answered: 8,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 9,
    arg1: 3,
    arg2: 4,
    operator: "+",
    correct: 7,
    answered: 7,
    isCorrectly: true,
  },
  {
    summery_id: 1,
    question_no: 10,
    arg1: 3,
    arg2: 5,
    operator: "+",
    correct: 8,
    answered: 8,
    isCorrectly: true,
  },
];

const newData = [];
for (let i = 0; i <= 2; i++) {
  data.forEach((value) => {
    newData.push({
      // id: value.id + i * 10,
      summary_id: i + 1,
      question_no: value.question_no,
      arg1: value.arg1,
      arg2: value.arg2,
      operator: value.operator,
      correct: value.correct,
      answered: value.answered,
      isCorrectly: value.isCorrectly,
    });
  });
}

const table = "result_detail";
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(table).del();
  await knex(table).insert(newData);
};
