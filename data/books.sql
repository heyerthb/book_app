DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  author VARCHAR (255),
  title VARCHAR(255),
  isbn VARCHAR (255),
  image_URL VARCHAR (255),
  bookshelf VARCHAR  (255),
  description TEXT
);

INSERT INTO books (author, title, isbn, image_URL, bookshelf, description)

VALUES ('josh','book of josh','666','selfieL', 'boo', 'all about that gram');



INSERT INTO books (author, title, isbn, image_URL, bookshelf, description)

VALUES ('matt','bible: part deux','123','not selfie', 'elf', 'pinterest this');
