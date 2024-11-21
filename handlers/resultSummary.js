
const table = "result_summary";

module.exports = {
  table,
  async findUser(knex, user_id) {
    console.log("---resultSummary.js--findUser--start-");

    return await knex
      .select("T.*")
      .from(`${table} as T`)
      .join("parameters as P", "P.id", "T.parameter_id")
      .where("P.user_id", user_id)
      .whereNotNull("time");
  },

  async findSummary(knex, id) {
    console.log("---resultSummary.js--findSummery--start-");

    return await knex
      .select(
        "T.*",
        "P.user_id",
        "P.arg1_min",
        "P.arg1_max",
        "P.arg1_list",
        "P.arg1_decimal",
        "P.arg2_min",
        "P.arg2_max",
        "P.arg2_list",
        "P.arg1_decimal",
        "P.operator",
        "P.res_min",
        "P.res_max",
      )
      .from(`${table} as T`)
      .join("parameters as P", "P.id", "T.parameter_id")
      .where("T.id", id);
  },

  async new(knex, { parameter_id, question_count }) {
    console.log("---resultSummary.js--new--start-");
    // let newId = await knex(table).max("id").first();
    // newId = newId.max + 1;
    // console.log("newId----", newId);
    // console.log("parameter_id----", parameter_id);
    return await knex(table)
      .insert({
        parameter_id: parameter_id,
        question_count: question_count,
        timestamp: new Date(),
        // id: newId,
      })
      .returning("*");
  },

  //結果登録
  async edit(knex, { summary_id, correct_count, time }) {
    console.log(`---${table}--edit--start-`);

    return await knex(table)
      .update({
        time: time,
        correct_count: correct_count,
      })
      .where({
        id: Number(summary_id),
      })
      .returning("*");
  },
};
