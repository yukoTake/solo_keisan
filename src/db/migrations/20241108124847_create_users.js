/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table = "users";
exports.up = async (knex) => {
  await knex.schema.createTable(table, (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("password").notNullable();
    table.timestamp("timestamp").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(table);
};
