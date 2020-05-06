
exports.up = function(knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
      commentsTable.increments("comment_id").primary()
      commentsTable.text('author').notNullable()
      commentsTable.foreign('author').references('users.username')
      commentsTable.integer('article_id').notNullable()
      commentsTable.foreign('article_id').references('articles.article_id')
      commentsTable.integer('votes').defaultTo("0")
      commentsTable.text('created_at').notNullable()
      commentsTable.text('body').notNullable()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
