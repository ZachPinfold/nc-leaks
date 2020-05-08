const {selectTopics, selectTopicById} = require('../models/topics.model')

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