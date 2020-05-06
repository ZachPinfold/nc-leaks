const {updateCommentVoteById} = require('../models/comment.model')

exports.patchComments = (req, res, next) => {
    const {comment_id} = req.params
    const {inc_votes} = req.body
    updateCommentVoteById(comment_id, inc_votes).then((comment) => {
    res.status(200)
    res.send(comment)
    })
}