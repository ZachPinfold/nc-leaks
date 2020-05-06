const commentsRouter = require("express").Router();
const {patchComments, deleteComments} = require('../controllers/comment.controller')


commentsRouter.route('/:comment_id').patch(patchComments)
commentsRouter.route('/:comment_id').delete(deleteComments)


module.exports = commentsRouter;

