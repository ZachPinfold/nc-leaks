const connection = require('../connection')

exports.selectUsernameById = (username) => {
    return connection
    .select('*')
    .from('users')
    .where('username', username)
    .returning('*')
    .then(([user]) => {
        if (user === undefined) {
            return Promise.reject({status: 404, msg: 'user not found'})
        }
        return {user}
    })
}