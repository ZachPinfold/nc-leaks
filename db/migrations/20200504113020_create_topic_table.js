exports.up = function (knex) {
  return knex.schema.createTable("topics", (topicsTable) => {
    topicsTable.text("slug").primary();
    // topicsTable.unique("slug");
    topicsTable.text("description").notNullable();
    topicsTable.text('color')
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable("topics")
};
//