const {
  formatDates,
  makeRefObj,
  formatComments,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("should return a reformatted date from the timestamp provided in a comment", () => {
    const input1 = [
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
    const updatedDate = formatDates(input1);
    updatedDate.map((item) => {
      // expect(item.created_at).toBe(new Date(1385210163389))
      expect(item.created_at).not.toBe("Invalid Date");
    });
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
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171,
      },
    ];

    const updatedDate = formatDates(input2);
    updatedDate.map((item) => {
      expect(item.created_at).not.toBe("Invalid Date");
    });
  });
});

describe("makeRefObj", () => {
  test("This utility function should be able to take an array (list) of objects and return a reference object", () => {
    const input = [
      {
        article_id: 27,
        title: "Thanksgiving Drinks for Everyone",
        body:
          "Thanksgiving is a foodie’s favorite holiday. Mashed potatoes, cranberry sauce, stuffing, and last but not least, a juicy turkey. Don’t let your meticulous menu fall short of perfection; flavorful cocktails are just as important as the meal. Here are a few ideas that will fit right into your festivities.",
        votes: 0,
        topic: "cooking",
        author: "grumpy19",
        created_at: "4/23/2017",
      },
      {
        article_id: 28,
        title: "High Altitude Cooking",
        body:
          "Most backpacking trails vary only a few thousand feet elevation. However, many trails can be found above 10,000 feet. But what many people don’t take into consideration at these high altitudes is how these elevations affect their cooking.",
        votes: 0,
        topic: "cooking",
        author: "happyamy2016",
        created_at: "5/27/2018",
      },
    ];
    const output = {
      "Thanksgiving Drinks for Everyone": 27,
      "High Altitude Cooking": 28,
    };
    expect(makeRefObj(input, "article_id", "title")).toEqual(output);
  });
});

describe("formatComments", () => {

  
  test("This utility function should be able to take an array of comment objects (comments) and a reference object, and return a new array of formatted comments.", () => {
    const articlArray = [  {
      article_id: 9,
      title: "They're not exactly dogs, are they?",
      body: 'Well? Think about it.',
      votes: 0,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: '11/23/1986'
    }, {
      article_id: 23,
      title: "Zach's book",
      body: 'Well? Think about it.',
      votes: 0,
      topic: 'mitch',
      author: 'zach',
      created_at: '11/23/1986'
    }]

    const input = [{
  body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
  belongs_to: "They're not exactly dogs, are they?",
  created_by: 'butter_bridge',
  votes: 16,
}, {
  body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
  belongs_to: "Zach's book",
  created_by: 'zach',
  votes: 16,
}
  ];
    const output = [
      {
        article_id: 9,
        body:
          "Oh, I've got compassion running out of my " +
          "nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
      },
      {
        article_id: 23,
        body:
          "Oh, I've got compassion running out of my " +
          "nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "zach",
      },
    ];
    const lookUpObj = makeRefObj(articlArray, 'article_id', 'title')
    const format = formatComments(input, lookUpObj, 'belongs_to', 'article_id', 'created_by', 'author')
    expect(format).toEqual(output)
  });

  test('should do the same as above, but with different data', () => {
    const articlArray = [  {
      article_id: 25,
      title: "who's that giiiirl?",
      body: 'Well? Think about it.',
      votes: 0,
      topic: 'music',
      author: 'Eve',
      created_at: '11/23/1986'
    }, {
      article_id: 30,
      title: "Hit me baby one more time",
      body: 'Well? Think about it.',
      votes: 0,
      topic: 'mitch',
      author: 'Britney',
      created_at: '11/23/1986'
    }]


    const lookUpObj = makeRefObj(articlArray, 'article_id', 'title')


    const input = [{
      body: "song lyrics for who's that girl!",
      belongs_to: "who's that giiiirl?",
      created_by: 'Eve',
      votes: 16,
    }, {
      body: "Different song lyrics",
      belongs_to: "Hit me baby one more time",
      created_by: 'Britney',
      votes: 16,
    }]

    const output = [{
        article_id: 25,
        body:
        "song lyrics for who's that girl!",
        votes: 16,
        author: "Eve",
      },
      {
        article_id: 30,
        body:
       'Different song lyrics',
        votes: 16,
        author: "Britney",
    }]
    const format = formatComments(input, lookUpObj, 'belongs_to', 'article_id', 'created_by', 'author')
    expect(format).toEqual(output)
  });

});
