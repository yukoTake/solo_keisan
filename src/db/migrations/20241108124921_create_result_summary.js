/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="result_summary"
exports.up = async(knex) =>{
    await knex.schema.createTable(table, (table) => {
        table.increments("id").primary();
        table.integer("parameter_id")
            .references("parameters.id")
            .onDelete("CASCADE")
        table.integer("time").notNullable()
        table.integer("miss_count").notNullable()
        table.date("date").notNullable()
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable(table)
};
