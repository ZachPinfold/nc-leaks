const {selectArticleById, patchArticleVoteById} = require('../models/article.model')

exports.getArticles = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then((article) => {
        console.log(article)
        res.status(200)
        res.send(article)
    })
}

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params
    const votes = req.body.inc_votes
    patchArticleVoteById(article_id, votes).then((article) => {
        res.status(200)
        res.send(article)
    })
}