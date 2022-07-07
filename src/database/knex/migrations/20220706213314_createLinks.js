exports.up = (knex) =>
  knex.schema.createTable("links", (table) => {
    table.increments("id");
    table
      .integer("id_note")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.text("url");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("links");
