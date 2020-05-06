exports.up = function (knex) {
  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.text("title").notNullable()
    articlesTable.text("body")
    articlesTable.integer('votes').defaultTo("0")
    articlesTable.text('topic').notNullable()
    articlesTable.foreign('topic').references("topics.slug")
    articlesTable.text('author').notNullable()
    articlesTable.foreign('author').references("users.username")
    articlesTable.text('created_at').notNullable()
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("articles");
};
