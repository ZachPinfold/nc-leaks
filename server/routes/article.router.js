const articlesRouter = require("express").Router();
const {getArticles} = require('../controllers/article.controller')


articlesRouter.route('/:article_id').get(getArticles)

module.exports = articlesRouter;

