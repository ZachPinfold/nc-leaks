const connection = require("../connection");

exports.selectArticleById = (article_id) => {
  return connection
    .select("articles.*")
    .count("comments.comment_id as comment_count")
    .from("articles")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .returning("*")
    .then((article) => {
      return { article };
    });
};

exports.patchArticleVoteById = (article_id, votes) => {
  return (
    connection("articles")
      // .update({votes})
      .where({ article_id })
      .increment("votes", votes)
      .returning("*")
      .then((article) => {
        return { article };
      })
  );
};

exports.postCommentByArticleId = (article_id, commentData) => {
  const { username, body } = commentData;
  let date = new Date();
  return connection
    .into("comments")
    .insert([
      {
        author: username,
        body: body,
        article_id: article_id,
        created_at: date,
      },
    ])
    .returning("*")
    .then((comment) => {
      return { comment };
    });
};

exports.getCommentsByArticleId = (article_id, order = "desc") => {
  return connection
    .select("comment_id", "author", "votes", "created_at", "body")
    .from("comments")
    .where("article_id", article_id)
    .orderBy("created_at", order)
    .returning("*")
    .then((comments) => {
      return { comments };
    });
};

exports.fetchAllArticles = () => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.topic",
      "articles.created_at",
      "articles.votes",
    )
    .count("comments.comment_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy("created_at", 'desc')
    .returning("*")
    .then((articles) => {
        return {articles}
    });
};
