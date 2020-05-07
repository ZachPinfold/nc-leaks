const commentsRouter = require("express").Router();
const {patchComments, deleteComments} = require('../controllers/comment.controller')
const {send405} = require('../controllers/error.controller')

commentsRouter.route('/:comment_id').patch(patchComments).delete(deleteComments).all(send405)


module.exports = commentsRouter;

