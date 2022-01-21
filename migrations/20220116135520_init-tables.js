/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments();
        table.string("username").unique();
        table.string("password");
    }).then(() => {
        return knex.schema.createTable("note", (table) => {
            table.increments();
            table.integer("user");
            table.foreign("user").references("users.id");
            table.string("note");
            table.timestamps(false, true);
        })
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("note").then(() => {
        return knex.schema.dropTable("users")
    })
};
