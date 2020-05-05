const connection = require("../connection");

exports.selectArticleById = (article_id) => {
  return connection
    .select("articles.*")
    .count('comments.comment_id as comment_count')
    .from("articles")
    .join('comments', 'articles.article_id', '=', 'comments.article_id')
    .where("articles.article_id", article_id)
    .groupBy('articles.article_id')
    .returning("*")
    .then((articleData) => {
        console.log(articleData)
       return articleData[0]
    });
};
