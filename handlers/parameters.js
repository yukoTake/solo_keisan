const table = "parameters";

module.exports = {
  table,
  async find(knex, id) {
    console.log(`---${table}--find--start-`);
    return await knex.select("*").from(`${table} as T`).where({ id });
  },
  async findUser(knex, userId) {
    console.log(`---${table}--findUser--start-`);
    return await knex
      .select("*")
      .from(`${table} as T`)
      .where("user_id", userId);
  },

  async new(
    knex,
    {
      user_id,
      arg1_min,
      arg1_max,
      arg1_decimal,
      arg1_list,
      arg2_min,
      arg2_max,
      arg2_decimal,
      arg2_list,
      operator,
      res_min,
      res_max,
      question_count,
    },
  ) {
    console.log(`---${table}--new--start-`);
    // let newId = await knex(table).max("id").first();
    // newId = newId.max + 1;
    // console.log("newId----", newId);
    return await knex(table)
      .insert({
        // id: newId,
        user_id: user_id,
        arg1_min: arg1_min,
        arg1_max: arg1_max,
        arg1_decimal: arg1_decimal,
        arg1_list: arg1_list,
        arg2_min: arg2_min,
        arg2_max: arg2_max,
        arg2_decimal: arg2_decimal,
        arg2_list: arg2_list,
        operator: operator,
        res_min: res_min,
        res_max: res_max,
        question_count: question_count,
        timestamp: new Date(),
      })
      .returning("*");
  },
};
