'use strict';




require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const app = express();
const pg = require('pg');


const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

//DB SETUP
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


//API Routs

app.get('/', getBooks);
app.post('/searches', createSearch);
app.get('/searches/new', newSearch);
app.post('/books', createBooks)
app.get('/book:id', getSingleBook);

// app.post('/index')

// app.get('/', (request, response) =>{  Not sure what this is RN

////CATCH ALL
// app.get(path, pathNotFoundHandler);
app.get('*', (request, response) => response.status(404).send('This route does not exist'));


// WORKING ON DB ROUTING!! LOOK HERE AND RIGHT ABOVE ^^^^^^^

function getBooks(request, response){

  let SQL = `SELECT * FROM "books";`;

  return client.query(SQL)
    .then(results => {
      if (results.rowCount === 0) {
        response.render('pages/searches/new');
      } else {
        response.render('pages/index', {books: results.rows});
      }
    })
    .catch (err => handleError(err, response));
}
function createBooks(request, response){
  let { title, author, isbn, image_url, description, bookshelf } = require.body;
  let SQL = `INSERT INTO books (title, author, isbn, image_url, description, bookshelf) VALUES($1, $2, $3, $4, $5, $6):`;
  let values = [title, author, isbn, image_url, description, bookshelf];

  return client.query(SQL, values)
    .then(()=> {
      SQL = `SELECT * FROM "books" WHERE isbn=$1`;
      values =[require.body.isbn];
      return client.query(SQL, values)
        .then(results => response.redirect(`/book/${results.rows[0].id}`))
        .catch(err => handleError(err, response))

    })
    .catch (err => handleError(err, response));
}

function getSingleBook(request, response){
  let SQL = `SELECT * FROM books WHERE id=$1;`;   //use temp literals here? request.params.di
  let values = [request.params.id];
  return client.query(SQL, values)
    .then(results => response.render('pages/book/show', {book: results.rows[0]}))
    .catch(err => handleError(err, response))
}
////////////////////////////^^^^^^^^^ There could be an error hurr.



//ASSIST FUNCTIONS!


function Book(info){
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  let httpRegex = /^(https:\/\/)?g/

  this.title = info.title ? info.title : 'no title available';
  this.authors = info.authors ? info.authors : 'no author available';
  this.isbn = info.industryIdentifiers ? `ISBN_13 ${info.industryIdentifiers[0].identifier}` : 'No ISBN available';
  this.image = info.imageLinks ? info.imageLinks.thumbnail.replace(httpRegex, 'https') : placeholderImage;
  this.description = info.description ? info.description :'no description available'

}

function newSearch(request, response){
  response.render('pages/searches/new');
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);
  
  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)

    .then(apiResponse => {
      // console.log(apiResponse.body.items[0].volumeInfo)
      return apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo));
    })
    .then(results => {
      return response.render('pages/searches/show', {searchResults: results})
    })
    .catch(error => handleError(error, response));
}



// ERROR HANDLER//////////////////
function handleError (error, response){
  console.error(error);
  response.status(500).send('No no no')
}

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));





