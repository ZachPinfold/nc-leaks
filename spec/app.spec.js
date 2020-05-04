const request = require('supertest')
const app = require('../server/app')
const connection = require('../server/connection')

describe('/API', () => {

// BASELINE TESTING

    afterAll(() => {
        return connection.destroy()
    })
    test('should return that the base route endpoint is working', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
            expect(body.msg).toEqual("api is up and running ok")
        })
    });
    
// TOPICS TESTING

    describe('/topics', () => {

        test('should ', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                body.topics.forEach((topic) => {
                    expect(topic).toHaveProperty('slug');
                    expect(topic).toHaveProperty('description');
                })
            })
     
        });

    });

})