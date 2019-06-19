DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR (255),
  title VARCHAR(255),
  ISBN VARCHAR (255),
  image_URL VARCHAR (255),
  bookshelf VARCHAR  (255),
  description TEXT
);

INSERT INTO books (author, title, ISBN, image_URL, bookshelf, description)

VALUES ('author','title','ISBN','image_URL', 'bookshelf', 'description');


