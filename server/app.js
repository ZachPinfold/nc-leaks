const express = require("express");
const apiRouter = require("./routes/api.router.js");
const { send404, handleInternalError, handleCustomError } = require("./controllers/error.controller");
const app = express();

app.use(express.json());
app.use("/api", apiRouter);
app.use(send404);

app.use(handleCustomError)
app.use(handleInternalError)
module.exports = app;

// app.listen(3060, () => {
//     console.log('listening to server')
// })