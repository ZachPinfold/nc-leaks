const {selectArticleById, patchArticleVoteById} = require('../models/article.model')

exports.getArticles = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then(({article}) => {
        // conso
        res.status(200)
        res.send(article[0])
    })
}

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params
    const votes = req.body.inc_votes
    patchArticleVoteById(article_id, votes).then(({article}) => {
        const {votes} = article[0]
        // console.log(votes)
        res.status(200)
        res.send(article[0])
    })
}