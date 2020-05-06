exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: "resource not found" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: "bad request" });
  } else if (err.code === '23503') {
    res.status(404).send({msg: 'related article not found'})
  } else if (err.code === '42703') {
    res.status(400).send({msg: 'bad request'})
  } else if (err.code === '23502') {
    res.status(400).send({msg: 'bad request'})
  } else {
    next(err);
  }
};

exports.handleCustomError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleInternalError = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "Internal server error" });
};
