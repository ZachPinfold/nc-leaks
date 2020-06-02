process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../server/app");
const connection = require("../server/connection");
const endpoint = require("../endpoints.json");

beforeEach(() => connection.migrate.rollback());
beforeEach(() => connection.migrate.latest());
beforeEach(() => connection.seed.run());

describe("/TESTING", () => {
  // BASELINE TESTING

  afterAll(() => {
    return connection.destroy();
  });

  describe("/api", () => {
    test("200 should return that the base route endpoint is working", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(endpoint);
        });
    });

    // API ERRORS

    test("GET 404 - when incorrect route is specified at /!, returns 404 and incorrect message", () => {
      return request(app)
        .get("/wrongURL")
        .expect(404)
        .then((respond) => {
          expect(respond.body.msg).toEqual("resource not found");
        });
    });

    test("GET 405 - invalid method", () => {
      return request(app)
        .patch("/api")
        .expect(405)
        .then((respond) => {
          expect(respond.body.msg).toEqual("invalid method");
        });
    });
  });

  // TOPICS TESTING

  describe("/topics", () => {
    test("GET 200 should return an array of all the topics", () => {
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

    test("GET 200 shoudl return a topic by id", () => {
      return request(app)
        .get("/api/topics/mitch")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body.topic)).toEqual(false);
          expect(body.topic).toHaveProperty("slug");
          expect(body.topic).toHaveProperty("description");
        });
    });

    // TOPICS ERROR TESTING

    test("GET 404 - when incorrect route is specified on api/!, returns 404 and incorrect message", () => {
      return request(app)
        .get("/api/wrongURL")
        .expect(404)
        .then((respond) => {
          expect(respond.body.msg).toEqual("resource not found");
        });
    });

    test("GET 404 - when topic doesn't exist", () => {
      return request(app)
        .get("/api/topics/wrongtopic")
        .expect(404)
        .then((respond) => {
          expect(respond.body.msg).toEqual("topic not found");
        });
    });

    test("GET 405 - invalid method", () => {
      return request(app)
        .patch("/api/topics")
        .expect(405)
        .then((respond) => {
          expect(respond.body.msg).toEqual("invalid method");
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
          expect(Array.isArray(body.user)).toBe(false);
          expect(body.user.username).toBe("butter_bridge");
          expect(body.user.avatar_url).toBe(
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
          );
          expect(body.user.name).toBe("jonny");
        });
    });

    // USER ERROR TESTING

    test("GET 404 - when incorrect route is specified on api/users/!, returns 404 and incorrect message", () => {
      return request(app)
        .get("/api/users/not-a-user")
        .expect(404)
        .then((respond) => {
          expect(respond.body.msg).toEqual("author not found");
        });
    });

    test("GET 405 - invalid method", () => {
      return request(app)
        .patch("/api/users/butter_bridge")
        .expect(405)
        .then((respond) => {
          expect(respond.body.msg).toEqual("invalid method");
        });
    });
  });

  // ARTICLE TESTING

  describe("/articles", () => {
    describe("GET /api/articles/:article_id", () => {
      test("GET 200 should return with an article by article id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.article)).toBe(false);
            expect(body.article.article_id).toBe(1);
            expect(body.article.title).toBe(
              "Living in the shadow of a great man"
            );
            expect(body.article.body).toBe("I find this existence challenging");
            expect(body.article.votes).toBe(100);
            expect(body.article.topic).toBe("mitch");
            expect(body.article.author).toBe("butter_bridge");
            expect(body.article.comment_count).toBe("13");
          });
      });

      test("GET 200 should return with an article by article id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.article)).toBe(false);
            expect(body.article.article_id).toBe(1);
            expect(body.article.title).toBe(
              "Living in the shadow of a great man"
            );
            expect(body.article.body).toBe("I find this existence challenging");
            expect(body.article.votes).toBe(100);
            expect(body.article.topic).toBe("mitch");
            expect(body.article.author).toBe("butter_bridge");
            expect(body.article.comment_count).toBe("13");
          });
      });

      // ARTICLE ERROR TESTING - GET ARTICLE BY ID

      test("GET 404 - when article id cannot be found at api/article/!, returns 404 and incorrect message", () => {
        return request(app)
          .get("/api/articles/5000")
          .expect(404)
          .then((respond) => {
            expect(respond.body.msg).toEqual("article not found");
          });
      });

      // test.only("GET 404 - when article id cannot be found at api/article/!, returns 404 and incorrect message", () => {
      //   return request(app)
      //     .get("/api/articles/hello")
      //     .expect(404)
      //     .then((respond) => {
      //       expect(respond.body.msg).toEqual("article not found");
      //     });
      // });

      test("405 - invalid method", () => {
        return request(app)
          .put("/api/articles/1")
          .expect(405)
          .then((respond) => {
            expect(respond.body.msg).toEqual("invalid method");
          });
      });
    });
    // patch article by id

    describe("PATCH /api/articles/:article_id", () => {
      test("PATCH 200 patch article votes by article id (increase)", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 50 })
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.article)).toBe(false);
            expect(body.article.votes).toBe(150);
          });
      });

      test("PATCH 200 patch article votes by article id(decrease)", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -50 })
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.article)).toBe(false);
            expect(body.article.votes).toBe(50);
          });
      });

      // ARTICLE ERROR TESTING - PATCH ARTICLE BY ID

      test("PATCH 404 - when patching and incorrect url is posted at api/article/!, returns 404 and incorrect message", () => {
        return request(app)
          .patch("/api/articles/5000")
          .expect(404)
          .then((respond) => {
            expect(respond.body.msg).toEqual("article not found");
          });
      });

      // test("PATCH 400 - When string is passed instead of numbers, should return with incorrect format", () => {
      //   return request(app)
      //     .patch("/api/articles/1")
      //     .send({ inc_votes: "not-a-number" })
      //     .expect(400)
      //     .then((respond) => {
      //       expect(respond.body.msg).toEqual("bad request");
      //     });
      // });

      test("a patch with no body should return the original article", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.article)).toBe(false);
            expect(body.article.votes).toBe(100);
          });
      });
    });

    // post comment to article by article ID

    describe("POST /api/articles/:article_id/comments", () => {
      test("POST 201 Adds a new comment to an article by article id", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "this really was a great read for sure",
          })
          .expect(201)
          .then(({ body }) => {
            expect(Array.isArray(body.comment)).toBe(false);
            const { comment } = body;
            expect(comment.comment_id).toBe(19);
            expect(comment.author).toBe("butter_bridge");
            expect(comment.article_id).toBe(1);
            expect(comment.votes).toBe(0);
            expect(comment.created_at).not.toBe("Invalid Date");
            expect(comment.body).toBe("this really was a great read for sure");
          });
      });

      // POST COMMENT TO ARTICLE ERROR HANDLER

      test("POST 404 - when incorrect route is specified at api/article/!/comments, returns 404 and incorrect message", () => {
        return request(app)
          .post("/api/articles/50000/comments")
          .expect(400)
          .then((respond) => {
            expect(respond.body.msg).toEqual("bad request");
          });
      });
    });

    // get comments by article id

    describe("GET /api/articles/:article_id/comments", () => {
      test("GET 200 Get all the available comments by its id", () => {
        return request(app)
          .get("/api/articles/9/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).toBe(2);
            expect(Array.isArray(body.comments)).toBe(true);
            body.comments.forEach((comment) => {
              expect(comment).toHaveProperty("comment_id");
              expect(comment).toHaveProperty("author");
              expect(comment).toHaveProperty("votes");
              expect(comment).toHaveProperty("body");
              expect(comment).toHaveProperty("created_at");
            });
          });
      });

      test("GET 200 Get all the available comments by its id (even when there are no comments)", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).toBe(0);
            expect(Array.isArray(body.comments)).toBe(true);
          });
      });

      // Error handling for get comments by id

      test("GET 404 - when incorrect route is specified at api/article/!/comments, returns 404 and incorrect message", () => {
        return request(app)
          .get("/api/articles/50000/comments")
          .expect(404)
          .then((respond) => {
            expect(respond.body.msg).toEqual("article not found");
          });
      });

      test("405 - invalid method", () => {
        return request(app)
          .put("/api/articles/1/comments")
          .expect(405)
          .then((respond) => {
            expect(respond.body.msg).toEqual("invalid method");
          });
      });
    });

    // get comments by article id & sort by deafult (created_at)

    describe("GET /api/articles/:article_id/comments SORT BY DEFAULT CREATED AT", () => {
      test("GET 200 responds with an array of all the articles comments sorted by created at (newest first)", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            body.comments.forEach((comment) => {
              expect(comment).toHaveProperty("comment_id");
              expect(comment).toHaveProperty("author");
              expect(comment).toHaveProperty("votes");
              expect(comment).toHaveProperty("created_at");
              expect(comment).toHaveProperty("body");
            });
            expect(Array.isArray(body.comments)).toBe(true);
            expect(body.comments).toBeSortedBy("created_at", {
              descending: true,
              //  coerce: true
            });
          });
      });
    });

    describe("GET /api/articles/:article_id/comments SORT BY ASC/DESC based on order query", () => {
      // get comments by article id & SORT BY A VALID ASC/DESC QUERY

      test("GET 200 responds with an array of all the articles comments sorted by a valid query ASC/DESC", () => {
        return request(app)
          .get("/api/articles/1/comments?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.comments)).toBe(true);
            expect(body.comments).toBeSortedBy("created_at", {
              descending: false,
              //  coerce: true
            });
          });
      });

      // Error handling for when an incorrect sort-by query is made

      test("GET 400 - when query is incorrect when changing order, returns 400 and incorrect message", () => {
        return request(app)
          .get("/api/articles/1/comments?order=notcorrect")
          .expect(400)
          .then((body) => {
            expect(body.body.msg).toBe("bad request");
          });
      });
    });

    describe("GET sort array by a sort_by valid column (", () => {
      test("GET 200 should change up the order sort by, with a viable column", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.comments)).toBe(true);
            expect(body.comments).toBeSortedBy("votes", {
              descending: true,
              // coerce: true,
            });
          });
      });

      // Error testing for the sort_by being incorrect

      test("GET 400 - when incorrect query is specified for sort_by, returns 400 and incorrect message", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=noturl")
          .expect(400)
          .then((body) => {
            expect(body.body.msg).toBe("bad request");
          });
      });
    });

    //

    // get all articles

    describe("GET /api/articles", () => {
      test("GET 200 responds with an array of all the articles", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.articles)).toBe(true);
            body.articles.forEach((article) => {
              expect(article).toHaveProperty("author");
              expect(article).toHaveProperty("title");
              expect(article).toHaveProperty("article_id");
              expect(article).toHaveProperty("topic");
              expect(article).toHaveProperty("created_at");
              expect(article).toHaveProperty("votes");
              expect(article).toHaveProperty("comment_count");
            });
          });
      });

      // Error handling for api/article

      test("GET 404 - when incorrect url is specified at api/!, returns 404 and incorrect message", () => {
        return request(app)
          .get("/api/wrongURL")
          .expect(404)
          .then((respond) => {
            expect(respond.body.msg).toEqual("resource not found");
          });
      });

      test("GET 405 - invalid method", () => {
        return request(app)
          .patch("/api/articles")
          .expect(405)
          .then((respond) => {
            expect(respond.body.msg).toEqual("invalid method");
          });
      });

      describe("GET /api/articles & set queries", () => {
        describe("set order & sort by", () => {
          // Defaults sort-by articles to DATE in ascending order

          test("GET 200 responds with an array of all the articles sorted by a default (DATE)", () => {
            return request(app)
              .get("/api/articles")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                expect(body.articles).toBeSortedBy("created_at", {
                  descending: true,
                  //  coerce: true
                });
              });
          });

          // change the default sort by to ascending

          test("GET 200 should switch up the order to asc based on the query", () => {
            return request(app)
              .get("/api/articles?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                expect(body.articles).toBeSortedBy("created_at", {
                  descending: false,
                  //  coerce: true
                });
              });
          });

          // Error hanlding for the changing of order

          test("GET 400 - when query is incorrect to change order, returns 400 and incorrect message", () => {
            return request(app)
              .get("/api/articles?order=notcorrect")
              .expect(400)
              .then((body) => {
                expect(body.body.msg).toBe("bad request");
              });
          });

          // change the sort by to sort by a viable column

          test("GET 200 should change up the order sort by, with a viable column", () => {
            return request(app)
              .get("/api/articles?sort_by=comment_count")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                expect(body.articles).toBeSortedBy("comment_count", {
                  descending: true,
                  coerce: true,
                });
              });
          });

          // Error testing for the sort_by being incorrect

          test("GET 400 - when incorrect query is specified for sort_by, returns 400 and incorrect message", () => {
            return request(app)
              .get("/api/articles?sort_by=notcorrect")
              .expect(400)
              .then((body) => {
                expect(body.body.msg).toBe("bad request");
              });
          });
        });

        describe("set filtering by specific query", () => {
          // Filter the array by a specific username

          test("GET 200 filter the article by a specific username (butter_bridge)", () => {
            return request(app)
              .get("/api/articles?author=butter_bridge")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                body.articles.forEach((article) => {
                  expect(article.author).toEqual("butter_bridge");
                });
              });
          });

          test("GET 200 filter the article by a specific username (icellusedkars)", () => {
            return request(app)
              .get("/api/articles?author=icellusedkars")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                body.articles.forEach((article) => {
                  expect(article.author).toEqual("icellusedkars");
                });
              });
          });

          // Error testing for the filter query being incorrect

          test("GET 200 - when author exists, but no articles, return empty array", () => {
            return request(app)
              .get("/api/articles?author=lurker")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                expect(body.articles).toEqual([]);
              });
          });

          // Filter the array by a specific topic

          test("GET 200 filter the article by a specific topic (mitch)", () => {
            return request(app)
              .get("/api/articles?topic=mitch")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                body.articles.forEach((article) => {
                  expect(article.topic).toEqual("mitch");
                });
              });
          });

          test("GET 200 filter the article by a specific topic (cats)", () => {
            return request(app)
              .get("/api/articles?topic=cats")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                body.articles.forEach((article) => {
                  expect(article.topic).toEqual("cats");
                });
              });
          });

          test("GET 200 returns an empty array when articles for a topic don't exist", () => {
            return request(app)
              .get("/api/articles?topic=paper")
              .expect(200)
              .then(({ body }) => {
                expect(Array.isArray(body.articles)).toBe(true);
                expect(body.articles).toEqual([]);
              });
          });

          // Error testing for the filter query being incorrect

          test("GET 404 - when incorrect query is made for filter-by author, returns 404", () => {
            return request(app)
              .get("/api/articles?author=not-an-author")
              .expect(404)
              .then((body) => {
                expect(body.body.msg).toBe("author not found");
              });
          });

          test("GET 404 - when incorrect query is made for filter-by topic, returns 404", () => {
            return request(app)
              .get("/api/articles?topic=not-a-cat")
              .expect(404)
              .then((body) => {
                expect(body.body.msg).toBe("topic not found");
              });
          });
        });
      });

      describe("GET /api/articles & pagnation", () => {
        test("GET 200 should limit the number of articles shown by a number of responses (default 10)", () => {
          return request(app)
            .get("/api/articles?order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.articles)).toBe(true);
              expect(body.articles.length).toBe(10);
            });
        });

        test("GET 200 should limit the number of articles shown by a number of responses (custom)", () => {
          return request(app)
            .get("/api/articles?limit=5")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.articles)).toBe(true);
              expect(body.articles.length).toBe(5);
            });
        });

        test("GET 200 should set the page number by the p query", () => {
          return request(app)
            .get("/api/articles?p=2")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.articles)).toBe(true);
              expect(body.articles[0].article_id).toBe(11);
            });
        });

        test("GET 200 should respond with a total article count (ignoring filters)", () => {
          return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.articles)).toBe(true);
              body.articles.forEach((article) => {
                expect(article.total_count).toEqual("12");
              });
            });
        });

        test("GET 200 should respond with a total article count (with filters)", () => {
          return request(app)
            .get("/api/articles?topic=cats")
            .expect(200)
            .then(({ body }) => {
              expect(Array.isArray(body.articles)).toBe(true);
              body.articles.forEach((article) => {
                expect(article.total_count).toEqual("1");
              });
            });
        });
      });
    });
  });
  // COMMENTS TESTS

  // Patch existing comments with an updated (increased/decreased) vote count

  describe("/Comments", () => {
    describe("PATCH /api/comments/:comment_id", () => {
      test("PATCH 200 patch increase comment votes by comment id", () => {
        return request(app)
          .patch("/api/comments/3")
          .send({ inc_votes: 50 })
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.comment)).toBe(false);
            expect(body.comment.votes).toBe(150);
          });
      });

      test("PATCH 200 patch decrease comment votes by comment id", () => {
        return request(app)
          .patch("/api/comments/3")
          .send({ inc_votes: -50 })
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.comment)).toBe(false);
            expect(body.comment.votes).toBe(50);
          });
      });

      test("PATCH 200 - return a 200 for missing vote input", () => {
        return request(app)
          .patch("/api/comments/3")
          .send({ inc_votes: 0 })
          .expect(200)
          .then(({ body }) => {
            expect(Array.isArray(body.comment)).toBe(false);
            expect(body.comment.votes).toBe(100);
          });
      });

      // Error handling for the comment vote updating

      test("PATCH 404 - when patching and incorrect url is posted at api/comments/!, returns 404 and incorrect message", () => {
        return request(app)
          .patch("/api/comments/5000")
          .send({ inc_votes: 50 })
          .expect(404)
          .then((respond) => {
            expect(respond.body.msg).toEqual("comment not found");
          });
      });

      test("PATCH 400 - When string is passed instead of numbers, should return with bad request", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: "not-a-number" })
          .expect(400)
          .then((respond) => {
            expect(respond.body.msg).toEqual("bad request");
          });
      });

      test("405 - invalid method", () => {
        return request(app)
          .post("/api/comments/1")
          .expect(405)
          .then((respond) => {
            expect(respond.body.msg).toEqual("invalid method");
          });
      });
    });

    describe("DELETE /api/comments/:comment_id", () => {
      test("DELETE 204 - Removes comment by id", () => {
        return request(app).del("/api/comments/1").expect(204);
      });

      test("DELETE 404 - comment id is non-existent", () => {
        return request(app)
          .del("/api/comments/5000")
          .expect(404)
          .then((respond) => {
            expect(respond.body.msg).toEqual("comment not found");
          });
      });
    });
  });

  // EXTRA WORK FOR ADD ARTICLEs/TOPIC

  describe.only("POST /topics", () => {
    test("POST 201 - should post a new article to the topic ", () => {
      return request(app)
      .post("/api/topics/mitch")
      .send({
        title: 'New Article',
        author: 'butter_bridge',
        body: "This is a new article",
      })
      .expect(201)
      .then(({body}) => {
              expect(Array.isArray(body)).toBe(false);
      expect(body.author).toBe("butter_bridge");
      expect(body.topic).toBe('mitch');
      expect(body.created_at).not.toBe("Invalid Date");
      expect(body.body).toBe(
        "This is a new article"
      );
      })
    });

    // ERROR HANDLING

    test("POST 404 - when topic doesn't exist, return error", () => {
      return request(app)
        .post("/api/topics/nosuchtopic")
        .send({
          title: 'New Article',
          author: 'butter_bridge',
          body: "This is a new article",
        })
        .expect(404)
        .then((respond) => {
          expect(respond.body.msg).toEqual("FOREIGN KEY VIOLATION");
        });
    });

  });


});


// describe("POST /api/articles/:article_id/comments", () => {
//   test("POST 201 Adds a new comment to an article by article id", () => {
//     return request(app)
//       .post("/api/articles/1/comments")
//       .send({
//         username: "butter_bridge",
//         body: "this really was a great read for sure",
//       })
//       .expect(201)
//       .then(({ body }) => {
//         expect(Array.isArray(body.comment)).toBe(false);
//         const { comment } = body;
//         expect(comment.comment_id).toBe(19);
//         expect(comment.author).toBe("butter_bridge");
//         expect(comment.article_id).toBe(1);
//         expect(comment.votes).toBe(0);
//         expect(comment.created_at).not.toBe("Invalid Date");
//         expect(comment.body).toBe("this really was a great read for sure");
//       });
//   });
