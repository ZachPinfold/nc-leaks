const connection = require("../connection");

exports.updateCommentVoteById = (comment_id, inc_votes) => {
    return connection('comments')
    .where({comment_id})
    .increment('votes', inc_votes)
    .returning('*')
    .then((comment) => {
        if (comment.length === 0)   {
            return Promise.reject({status: 404, msg: 'comment not found'})
        }
        return {comment}
    })
}