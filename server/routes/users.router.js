const usersRouter = require("express").Router();
const {getUsernameById} = require('../controllers/users.controller.js')
const {send405} = require('../controllers/error.controller')


usersRouter.route('/:username').get(getUsernameById).all(send405)

module.exports = usersRouter;

