// const db = require("../src/db/index");
const table = "result_summary";

module.exports = {
  table,
  async all(knex, userID) {
    console.log("---resultSummary.js--all--start-");
    return await knex
      .select("S.*")
      .from(`${table} as S`)
      .join("parameters as P", "P.id", "S.parameter_id")
      .where("P.user_id", userID);
  },
};
