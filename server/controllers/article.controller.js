const {selectArticleById, patchArticleVoteById, postCommentByArticleId, getCommentsByArticleId, fetchAllArticles} = require('../models/article.model')

exports.getArticles = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then(({article}) => {
        res.status(200)
        res.send({article})
    }).catch((err) => {
        next(err)
    })
}

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params
    const votes = req.body.inc_votes
    patchArticleVoteById(article_id, votes).then(({article}) => {
        res.status(200)
        res.send({article})
    }).catch((err)=> {
        next(err)
    })
}

exports.postComment = (req, res, next) => {
    const {article_id} = req.params
    const commentData = req.body
    postCommentByArticleId(article_id, commentData).then((comment) => {
        res.status(201)
        res.send(comment)
    }).catch((err) => {
        next(err)
    })
}

exports.getComments = (req, res, next) => {
    const {article_id} = req.params
    const {order} = req.query
    getCommentsByArticleId(article_id, order).then((comments) => {
        res.status(200)
        res.send(comments)
    }).catch((err)=> {
        next(err)
    })
}

exports.getAllArticles = (req, res, next) => {
    const {order} = req.query
    const {sort_by} = req.query
    const {username} = req.query
    const {topic} = req.query
    fetchAllArticles(order, sort_by, username, topic).then((articles)=> {
        res.status(200)
        res.send(articles)
    }).catch((err) => {
        next(err)
    })
}