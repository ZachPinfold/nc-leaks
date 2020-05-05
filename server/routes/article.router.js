const articlesRouter = require("express").Router();
const {getArticles, patchArticle, postComment, getComments} = require('../controllers/article.controller')


articlesRouter.route('/:article_id').get(getArticles)
articlesRouter.route('/:article_id').patch(patchArticle)
articlesRouter.route('/:article_id/comments').post(postComment)
articlesRouter.route('/:article_id/comments').get(getComments)

module.exports = articlesRouter;

