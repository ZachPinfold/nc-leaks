const connection = require("../connection");

exports.selectArticleById = (article_id) => {
  return connection
    .select("articles.*")
    .count("comments.comment_id as comment_count")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .returning("*")
    .then(([article]) => {
      if (article === undefined){
        return Promise.reject({status: 404, msg: 'article not found'})
      }
      return { article };
    });
};

exports.patchArticleVoteById = (article_id, votes = 0) => {
  return connection("articles")
      // .update({votes})
      .where({ article_id })
      .increment("votes", votes)
      .returning("*")
      .then(([article]) => {
        if (article === undefined){
          return Promise.reject({status: 404, msg: 'article not found'})
        } else if (votes === 0) {
          return {article}
        }
        return { article };
      })
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
    .then(([comment]) => {
      return { comment };
    });
};



exports.getCommentsByArticleId = (article_id, order = "desc", sort_by = 'created_at') => {
  return connection
    .select("comment_id", "author", "votes", "created_at", "body")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by, order)
    .returning("*")
    .then((comments) => {
      // console.log(comments)
      if (order !== 'desc' && order !== 'asc') {
        return Promise.reject({status: 400, msg: 'bad request'})
      } 
      // else if (comments.length === 0) {
      //   return Promise.reject({status: 404, msg: 'related article not found'})
      // }
      return { comments };
    });
};



exports.fetchAllArticles = (order = 'desc', sort_by = 'created_at', author, topic, limit = 10, p = 1) => {
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
    .orderBy(sort_by, order)
    .limit(limit).offset(p*limit-limit)
    .modify((query) => {
      if (author)  query.where('articles.author', author)
      if (topic) query.where('articles.topic', topic)
    })
    .returning("*")
    .then((articles) => {
      if (order !== 'desc' && order !== 'asc') {
        return Promise.reject({status: 400, msg: 'bad request'})
      } 
      // if (topic === undefined) {
      //   return Promise.reject({status: 404, msg: 'topic not found'})
      // }
        return {articles}
    });
};

exports.countAllArticles = () => {
  return connection
    .count('*')
    .from('articles')
    .returning('*')
    .then((count)=> {
      return count[0].count
    })
}