'use strict';

const express = require('express');
const superagent = require('superagent');
const app = express();

//adding some green as garnish


const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

//adding some green as garnish

app.get('/', (request, response) =>{
  response.render('pages/index', {message : 'Shield Generator!'});
})

//API Routs
app.get('/', newSearch);
app.post('/searches', createSearch);


// //////////////ERROR HANDLER .
const path = '*'
function pathNotFoundHandler(request, response){
  return response.status(404).send('You shall not pass');
}

////CATCH ALL
app.get(path, pathNotFoundHandler);
app.get('*', (request, response) => response.status(404).send('This route does not exist'));



//ASSIST FUNCTIONS!


function Book(info){
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  let httpRegex = /^(https:\/\/)?g/

  this.title = info.title ? info.title : 'no title available';
  this.authors = info.authors ? info.author : 'no author available';
  this.isbn = info.industryIdentifier ? `ISBN_13 ${info.industryIdentifier[0].industryIdentifier}` : 'No ISBN available'; 
  this.image = this.image = info.imageLinks ? info.imageLinks.thumbnail.replace(httpRegex, 'https') : placeholderImage;
  this.description = info.description ? info.description :'no description available'

}

function newSearch(request, response){
  response.render('pages/index');
}

function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);
//   url += `+intitle:${request.body.search}`;
  if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
  if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

  superagent.get(url)
    .then(apiResponse => {
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

