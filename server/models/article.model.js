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
    .then((article) => {
       return {article}
    });
};

exports.patchArticleVoteById = (article_id, votes) => {
    return connection('articles')
    // .update({votes})
    .where({article_id})
    .increment('votes', votes)
    .returning('*')
    .then((article) => {
        return {article}
    })
}

exports.postCommentByArticleId = (article_id, commentData) => {
    const {username, body} = commentData
    let date = new Date()
    return connection
    .into('comments')
    .insert([{author: username, body: body, article_id: article_id, created_at: date}])

    // .returning('*')
    .then((comment) => {
        console.log(comment)
    })
}