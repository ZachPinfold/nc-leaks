const apiRouter = require("express").Router();
const topicsRouter = require('./topics.router')
const fromUsers = require('./users.router')
const articlesRouter = require('./article.router')


apiRouter.get("/", (req, res, next) => {
  res.status(200).send({ msg: "api is up and running ok" });
});

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', fromUsers)
apiRouter.use('/article', articlesRouter)

module.exports = apiRouter;
