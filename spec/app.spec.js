// process.env.NODE_ENV = 'test'
const request = require("supertest");
const app = require("../server/app");
const connection = require("../server/connection");

// beforeEach(()=> connection.seed.run())

describe("/API", () => {

  // BASELINE TESTING

  afterAll(() => {
    return connection.destroy();
  });
  test("200 should return that the base route endpoint is working", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).toEqual("api is up and running ok");
      });
  });

  // TOPICS TESTING

  describe("/topics", () => {
    test("200 should return an array of all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          console.log(body)
          expect(Array.isArray(body.topics)).toEqual(true);
          body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
  });

  // USERS TESTING

  describe("/users", () => {
    test("200 should return with a specific user", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.username).toBe("butter_bridge");
          expect(body.avatar_url).toBe(
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          );
          expect(body.name).toBe("jonny");
        });
    });
  });

  // ARTICLE TESTING

  describe("/articles", () => {
    test("200 should return with a article by id user", () => {
      return request(app)
        .get("/api/article/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article_id).toBe(1);
          expect(body.title).toBe('Living in the shadow of a great man');
          expect(body.body).toBe("I find this existence challenging");
          expect(body.votes).toBe(100);
          expect(body.topic).toBe('mitch');
          expect(body.author).toBe("butter_bridge");
          expect(body.comment_count).toBe('13');
        });
    });
  });

  // patch article by id

  test.only("200 patch article votes by article id", () => {
    return request(app)
    .patch("/api/article/1")
    .send({ inc_votes : 50 })
    .expect(200)
    .then(({body}) => {
      expect(body.votes).toBe(150);
    })
  });

});

// {
//     article_id: 1,
//     title: 'Living in the shadow of a great man',
//     body: 'I find this existence challenging',
//     votes: 100,
//     topic: 'mitch',
//     author: 'butter_bridge',
//     created_at: '2018-11-15T12:21:54.171+00:00'
//   }
