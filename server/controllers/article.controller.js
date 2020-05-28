const {selectArticleById, patchArticleVoteById, postCommentByArticleId, getCommentsByArticleId, fetchAllArticles, countAllArticles} = require('../models/article.model')
const {selectUsernameById} = require('../models/users.model')
const {selectTopicById} = require('../models/topics.model')


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
    const {sort_by} = req.query
    const {order} = req.query
    const queries = [getCommentsByArticleId(article_id, order, sort_by)]
    queries.push(selectArticleById(article_id))
    Promise.all(queries)
    .then((comments) => {
        const result = comments[0]
        res.status(200)
        res.send(result)
    }).catch((err)=> {
        next(err)
    })
}

exports.getAllArticles = (req, res, next) => {
    const {order} = req.query
    const {sort_by} = req.query
    const {author} = req.query
    const {topic} = req.query
    const {limit} = req.query
    const {p} = req.query
    const queries = [fetchAllArticles(order, sort_by, author, topic, limit, p), countAllArticles(author, topic)]
    if (author) queries.push(selectUsernameById(author))
    if (topic) queries.push(selectTopicById(topic))
    Promise.all(queries)
    .then((results)=> {
        const count = results[1]
        const articles = results[0]
        articles.articles.map((article) => {
            article.total_count = count
            return article
        })
        res.status(200)
        res.send(articles)
    }).catch((err) => {
        next(err)
    })
}


// exports.getAllArticles = (req, res, next) => {
//     const {order} = req.query
//     const {sort_by} = req.query
//     const {author} = req.query
//     const {topic} = req.query
//     fetchAllArticles(order, sort_by, author, topic).then((articles)=> {
//         res.status(200)
//         res.send(articles)
//     }).catch((err) => {
//         next(err)
//     })
// }