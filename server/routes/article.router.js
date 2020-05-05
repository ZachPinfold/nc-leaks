const articlesRouter = require("express").Router();
const {getArticles, patchArticle, postComment} = require('../controllers/article.controller')


articlesRouter.route('/:article_id').get(getArticles)
articlesRouter.route('/:article_id').patch(patchArticle)
articlesRouter.route('/:article_id/comments').post(postComment)

module.exports = articlesRouter;

