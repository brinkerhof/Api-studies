exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name").notNullable();
    table
      .integer("id_note")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.integer("id_user").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("tags");
