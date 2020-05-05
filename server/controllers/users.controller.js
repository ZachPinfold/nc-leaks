const {selectUsernameById} = require('../models/users.model')

exports.getUsernameById = (req, res, next) => {
    const {username} = req.params
    selectUsernameById(username).then((user) => {
        console.log(user)
        res.status(200)
        res.send(user)
    })
}