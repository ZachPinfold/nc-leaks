const express = require("express");
const apiRouter = require("./routes/api.router.js");
const { send404, handleInternalError } = require("./controllers/error.controller");
const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(send404);

app.use(handleInternalError)
module.exports = app;
