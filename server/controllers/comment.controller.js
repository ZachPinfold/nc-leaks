const {updateCommentVoteById} = require('../models/comment.model')

exports.patchComments = (res, req, next) => {
    updateCommentVoteById().then((comment) => {
    res.status(200)
    res.send(comment)
    })
}