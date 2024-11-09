// const db = require("../src/db/index");
const table = "result_summery";

module.exports = {
  table,
  async all(knex, requestBody) {
    console.log("---resultSummary.js--all--start-");
    return await knex.select("*").from(table);
  },
};
