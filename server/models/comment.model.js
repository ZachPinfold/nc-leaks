const connection = require("../connection");

exports.updateCommentVoteById = (comment_id, inc_votes) => {
    return connection('comments')
    .where({comment_id})
    .increment('votes', inc_votes)
    .returning('*')
    .then((comment) => {
        return {comment}
    })
}