const {selectArticleById} = require('../models/article.model')

exports.getArticles = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then((article) => {
        console.log(article)
        res.status(200)
        res.send(article)
    })
}