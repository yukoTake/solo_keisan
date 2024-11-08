/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const table="parameters"
exports.up = async(knex) =>{
    await knex.schema.createTable(table, (table) => {
        table.increments("id").primary();
        table.integer("user_id")
            .references("users.id")
            .onDelete("CASCADE")
        table.integer("arg1_min").notNullable()
        table.integer("arg1_max").notNullable()
        table.integer("arg1_decimal").notNullable()
        table.integer("arg2_min").notNullable()
        table.integer("arg2_max").notNullable()
        table.integer("arg2_decimal").notNullable()
        table.string("operator").notNullable()
        table.integer("res_max").notNullable()
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable(table)
};


