const table = "parameters";

module.exports = {
  table,
  async find(knex, id) {
    console.log(`---${table}--find--start-`);
    return await knex.select("*").from(`${table} as T`).where({ id });
  },
};
