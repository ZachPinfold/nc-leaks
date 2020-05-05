const request = require("supertest");
const app = require("../server/app");
const connection = require("../server/connection");

describe("/API", () => {
  // BASELINE TESTING

  afterAll(() => {
    return connection.destroy();
  });
  test("should return that the base route endpoint is working", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).toEqual("api is up and running ok");
      });
  });

  // TOPICS TESTING

  describe("/topics", () => {
    test("should return an array of all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          body.topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug");
            expect(topic).toHaveProperty("description");
          });
        });
    });
  });

  // USERS TESTING

  describe("/users", () => {
    test("should return with a specific user", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.username).toBe("butter_bridge");
          expect(body.avatar_url).toBe("https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg");
          expect(body.name).toBe("jonny");
        });
    });
  });
});
