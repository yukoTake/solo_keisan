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
};
