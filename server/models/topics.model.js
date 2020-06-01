const connection = require('../connection')

exports.selectTopics = () => {
    return connection
    .select('*')
    .from('topics')
    .returning('*')
    .then((data) => {
        return data
    })
}

exports.selectTopicById = (topic) => {
    return connection
    .select('*')
    .from('topics')
    .where('slug', topic)
    .returning('*')
    .then(([topic]) => {
        if (topic === undefined) {
            return Promise.reject({status: 404, msg: 'topic not found'})
        }
        return {topic}
    })
}

exports.postArticle = (topic, articleData) => {
    const {title, author, body} = articleData
    return connection.into('articles').insert([
        {
            author: author,
            title: title,
            body: body,
            topic: topic
        }
    ]).returning('*')
    .then(([article]) => {
        return article
    })
}