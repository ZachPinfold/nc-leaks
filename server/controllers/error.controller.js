exports.send404 = (req, res, next) => {
    res.status(404).send({msg: 'resource not found'})
}

exports.handleInternalError = (err, req, res, next) => {
    console.log("unhandled error", err);
    res.status(500).send({ msg: "Internal server error" });
  };