/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "result_summary";
exports.up = async (knex) => {
  await knex.schema.createTable(table, (table) => {
    table.increments("id").primary();
    table.integer("time");
    table.integer("question_count");
    table.integer("correct_count");
    table.timestamp("timestamp").notNullable();
    table.integer("parameter_id");
    // table
    //   .foreign("parameter_id")
    //   .references("parameters.id")
    //   .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(table);
};
