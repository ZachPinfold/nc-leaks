const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  // return knex
  // .insert(topicData)
  // .into('topics')
  // .returning()


  const topicsInsertions = knex('topics').insert(topicData).returning('*');
  const usersInsertions = knex('users').insert(userData).returning('*');

  return Promise.all([topicsInsertions, usersInsertions])
    .then(() => {
      const newArticleData = formatDates(articleData)
      return knex
      .insert(newArticleData)
      .into('articles')
      .returning('*')
    })
    .then(articleRows => {


      const newCommentTimeData = formatDates(commentData)


      
      const articleRef = makeRefObj(articleRows, 'article_id', 'title');

      const formattedComments = formatComments(newCommentTimeData, articleRef, 'belongs_to', 'article_id', 'created_by', 'author') ;
      // console.log(formattedComments);
      return knex('comments').insert(formattedComments).returning("*")
    }).then((comment) => { console.log(comment)})
};







    //   /* 
      
    //   Your article data is currently in the incorrect format and will violate your SQL schema. 
      
    //   You will need to write and test the provided formatDate utility function to be able insert your article data.

    //   Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
    //   */

        //   /* 
    //   Your comment data is currently in the incorrect format and will violate your SQL schema. 

    //   Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
      
    //   You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
    //   */