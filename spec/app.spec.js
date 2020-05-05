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
          expect(body.article[0].article_id).toBe(1);
          expect(body.article[0].title).toBe(
            "Living in the shadow of a great man"
          );
          expect(body.article[0].body).toBe(
            "I find this existence challenging"
          );
          expect(body.article[0].votes).toBe(100);
          expect(body.article[0].topic).toBe("mitch");
          expect(body.article[0].author).toBe("butter_bridge");
          expect(body.article[0].comment_count).toBe("13");
        });
    });
  });

  // patch article by id

  test("200 patch article votes by article id", () => {
    return request(app)
      .patch("/api/article/1")
      .send({ inc_votes: 50 })
      .expect(200)
      .then(({ body }) => {
        expect(body.article[0].votes).toBe(150);
      });
  });

  // post comment to article by article ID

  test("201 Adds a new comment to an article by article id", () => {
    return request(app)
      .post("/api/article/1/comments")
      .send({
        username: "butter_bridge",
        body: "this really was a great read for sure",
      })
      .expect(201)
      .then(({ body }) => {

        expect(body.article[0].comment_id).toBe(19)
        expect(body.article[0].author).toBe('butter_bridge')
        expect(body.article[0].article_id).toBe(1)
        expect(body.article[0].votes).toBe(0)
        expect(body.article[0].body).toBe("this really was a great read for sure")
      });
  });
});
