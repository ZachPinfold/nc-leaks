const request = require('supertest')
const app = require('../server/app')
const connection = require('../server/connection')

describe('Errors', () => {
    afterAll(() => {
        return connection.destroy()
    })

    // API BASELINE ERROR TEST

    test('404 - when incorrect route is specified, returns 404 and incorrect message', () => {
        return request(app)
        .get('/wrongURL')
        .expect(404)
        .then((respond)=> {
            expect(respond.body.msg).toEqual('resource not found');
        })
    });

});