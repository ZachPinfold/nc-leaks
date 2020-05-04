const apiRouter = require("express").Router();
const {getTopics} = require('../controllers/topics.controller')

apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "api is up and running ok" });
});

apiRouter.use('/topics', getTopics)

module.exports = apiRouter;
