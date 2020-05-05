const articlesRouter = require("express").Router();
const {getArticles, patchArticle} = require('../controllers/article.controller')


articlesRouter.route('/:article_id').get(getArticles)
articlesRouter.route('/:article_id').patch(patchArticle)

module.exports = articlesRouter;

