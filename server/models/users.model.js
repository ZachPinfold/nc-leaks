const connection = require('../connection')

exports.selectUsernameById = (username) => {
    return connection
    .select('*')
    .from('users')
    .where('username', username)
    .returning('*')
    .then((users) => {
        if (users.length === 0) {
            return Promise.reject({status: 404, msg: 'user not found'})
        }
        return {users}
    })
}