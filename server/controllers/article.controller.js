const {selectArticleById, patchArticleVoteById, postCommentByArticleId, getCommentsByArticleId} = require('../models/article.model')

exports.getArticles = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then(({article}) => {
        // conso
        res.status(200)
    res.send({article})
    })
}

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params
    const votes = req.body.inc_votes
    patchArticleVoteById(article_id, votes).then(({article}) => {
        const {votes} = article[0]
        // console.log(votes)
        res.status(200)
        res.send({article})
    })
}

exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    const commentData = req.body
    postCommentByArticleId(article_id, commentData).then((comment) => {
        res.status(201)
        res.send(comment)
    })
}

exports.getComments = (req, res, next) => {
    const {article_id} = req.params
    const {order} = req.query
    getCommentsByArticleId(article_id, order).then((comments) => {
        res.status(200)
        res.send(comments)
    })
}