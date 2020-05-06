const connection = require("../connection");

exports.updateCommentVoteById = (comment_id, inc_votes) => {
    return connection('comments')
    .where({comment_id})
    .increment('votes', inc_votes)
    .returning('*')
    .then(([comment]) => {
        if (comment === undefined)   {
            return Promise.reject({status: 404, msg: 'comment not found'})
        }
        return {comment}
    })
}

exports.removeCommentById = (comment_id) => {
    return connection('comments')
    .where({comment_id})
    .del()
    .then((commentCount) => {
        if (commentCount === 0) return Promise.reject({status: 404, msg: 'comment not found'})
    })
}