/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "parameters";
exports.up = async (knex) => {
  await knex.schema.createTable(table, (table) => {
    table.increments("id").primary();
    table.integer("user_id").references("users.id").onDelete("CASCADE");
    table.integer("arg1_min");
    table.integer("arg1_max");
    table.specificType("arg1_list", "decimal[]");
    table.integer("arg1_decimal");
    table.integer("arg2_min");
    table.integer("arg2_max");
    table.integer("arg2_decimal");
    table.specificType("arg2_list", "decimal[]");
    table.string("operator").notNullable();
    table.integer("res_min").notNullable();
    table.integer("res_max").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(table);
};
