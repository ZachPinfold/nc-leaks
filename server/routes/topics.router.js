const topicsRouter = require("express").Router();
const {getTopics, getTopicById} = require('../controllers/topics.controller')
const {send405} = require('../controllers/error.controller')


topicsRouter.route('/').get(getTopics).all(send405)
topicsRouter.route('/:topic_id').get(getTopicById).all(send405)

module.exports = topicsRouter;

