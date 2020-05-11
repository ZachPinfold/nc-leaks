const articlesRouter = require("express").Router();
const {getArticles, patchArticle, postComment, getComments, getAllArticles} = require('../controllers/article.controller')
const {send405} = require('../controllers/error.controller')


articlesRouter.route('/').get(getAllArticles).all(send405)
articlesRouter.route('/:article_id').get(getArticles).patch(patchArticle).all(send405)
articlesRouter.route('/:article_id/comments').post(postComment).get(getComments).all(send405)

module.exports = articlesRouter;

