\c nc_news_test;

SELECT * FROM topics;
-- SELECT * FROM users;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT articles.*, COUNT(comments.article_id) FROM articles
-- LEFT JOIN comments 
-- ON articles.article_id = comments.article_id
-- WHERE articles.article_id = 1
-- GROUP BY articles.article_id;

-- INSERT into comments (body, author, article_id) values ('butter_bridge', 'butter_bridge', 1);

-- SELECT * FROM comments;

-- SELECT *
-- FROM articles
-- WHERE articles.title = 'none';

-- INSERT INTO articles
--     SELECT articles.title
--     WHERE NOT EXISTS 
--          (SELECT 1 FROM articles WHERE name = articles.title);