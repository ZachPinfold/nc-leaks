const commentsRouter = require("express").Router();
const {patchComments} = require('../controllers/comment.controller')


commentsRouter.route('/:comment_id').patch(patchComments)

module.exports = commentsRouter;

