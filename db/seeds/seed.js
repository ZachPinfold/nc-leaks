const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function (knex) {
  const topicsInsertions = knex("topics").insert(topicData).returning("*");
  const usersInsertions = knex("users").insert(userData).returning("*").then((user)=> {});
  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      const newArticleData = formatDates(articleData);
      return knex.insert(newArticleData).into("articles").returning("*")
    })
    .then((articleRows) => {
      // console.log(articleRows)
      const newCommentTimeData = formatDates(commentData);

      const articleRef = makeRefObj(articleRows, "article_id", "title");

      const formattedComments = formatComments(
        newCommentTimeData,
        articleRef,
        "belongs_to",
        "article_id",
        "created_by",
        "author"
      );
      return knex("comments").insert(formattedComments).returning("*");
    })
    .then((comment) => {
      console.log(comment);
    });
};
