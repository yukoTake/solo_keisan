/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="result_detail"
exports.up = async(knex) =>{
    await knex.schema.createTable(table, (table) => {
        table.increments("id").primary();
        table.integer("summary_id")
            .references("result_summary.id")
            .onDelete("CASCADE")
        table.decimal("arg1").notNullable()
        table.decimal("arg2").notNullable()
        table.string("operator").notNullable()
        table.decimal("correct").notNullable()
        table.decimal("answered").notNullable()
        table.boolean("isCorrectly").notNullable()
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable(table)
};

