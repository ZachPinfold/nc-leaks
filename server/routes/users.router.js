const usersRouter = require("express").Router();
const {getUsernameById} = require('../controllers/users.controller.js')


usersRouter.route('/:username').get(getUsernameById)

module.exports = usersRouter;

