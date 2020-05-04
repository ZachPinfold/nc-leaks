const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("should return a reformatted date from the timestamp provided in a comment", () => {
    const input = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1385210163389,
      },
      {
        body: "I hate streaming eyes even more",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: 1353674163389,
      },
    ];
    const output = [
      {
        body: "I hate streaming noses",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: "11/23/2013",
      },
      {
        body: "I hate streaming eyes even more",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 0,
        created_at: "11/23/2012",
      },
    ];
    expect(formatDates(input)).toEqual(output);
  });

  test("should return a reformatted date from the timestamp provided in an article", () => {
    const input2 = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171,
      },
    ];
    const output2 = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: '11/15/2018',
        votes: 100,
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: '11/17/2010',
      }
    ];
    expect(formatDates(input2)).toEqual(output2);
  });
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
