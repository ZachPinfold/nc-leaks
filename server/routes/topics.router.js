const topicsRouter = require("express").Router();
const {getTopics} = require('../controllers/topics.controller')
const {send405} = require('../controllers/error.controller')


topicsRouter.route('/').get(getTopics).all(send405)

module.exports = topicsRouter;

