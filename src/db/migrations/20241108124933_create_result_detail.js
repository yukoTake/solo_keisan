/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "result_detail";
exports.up = async (knex) => {
  await knex.schema.createTable(table, (table) => {
    table
      .integer("summary_id")
      .references("result_summary.id")
      .onDelete("CASCADE")
      .notNullable();
    table.integer("question_no").notNullable();
    table.primary(["summary_id", "question_no"]);
    table.decimal("arg1").notNullable();
    table.decimal("arg2").notNullable();
    table.string("operator").notNullable();
    table.decimal("correct").notNullable();
    table.decimal("answered");
    table.boolean("isCorrectly");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(table);
};
