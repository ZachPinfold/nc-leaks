const {selectUsernameById} = require('../models/users.model')

exports.getUsernameById = (req, res, next) => {
    const {username} = req.params
    selectUsernameById(username).then((user) => {
        res.status(200)
        res.send(user)
    }).catch((err) => {
        next(err)
    })
}