const {selectTopics, selectTopicById, postArticle} = require('../models/topics.model')

exports.getTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200)
        res.send({topics})
    }).catch((err)=> {
        next(err)
    })
}

exports.getTopicById = (req, res, next) => {
    const {topic_id} = req.params
    selectTopicById(topic_id).then((topic) => {
        res.status(200)
        res.send(topic)
    }).catch((err)=> {
        next(err)
    })
}

exports.postArticleById = (req, res, next) => {
    const {topic_id} = req.params
    const articleData = req.body
    postArticle(topic_id, articleData).then((article) => {
        console.log(article)
        res.status(201)
        res.send(article)
    })
}