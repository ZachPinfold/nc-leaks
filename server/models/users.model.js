const connection = require('../connection')

exports.selectUsernameById = (username) => {
    return connection
    .select('*')
    .from('users')
    .where('username', username)
    .returning('*')
    .then((users) => {
        return {users}
    })
}