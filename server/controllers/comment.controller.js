const {updateCommentVoteById, removeCommentById} = require('../models/comment.model')

exports.patchComments = (req, res, next) => {
    const {comment_id} = req.params
    const {inc_votes} = req.body
    updateCommentVoteById(comment_id, inc_votes).then((comment) => {
    res.status(200)
    res.send(comment)
    }).catch((err)=> {
        next(err)
    })
}

exports.deleteComments = (req, res, next) => {
    const {comment_id} = req.params
    removeCommentById(comment_id).then(() => {
        res.sendStatus(204)
    }).catch((err)=> {
        next(err)
    })
}