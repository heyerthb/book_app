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


//ASSIST FUNCTIONS!
function Book(info){
  const placeholder = 'https://i.imgur.com/J5LVHEL.jpg';

  this.title = info.title || 'no title available';
  this.author = info.author || 'no author available';
  this.image = info.imageLinks.thumbnail;
  this.description = info.description || 'no description available'

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
      console.log('*********************************************api res', apiResponse.body.items[0].volumeInfo);
      return apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo));
    })

    .then(results => {
      console.log('*************************************here is super agent', superagent.get)
      return response.render('pages/searches/show', {searchResults: results})

    })
}

// goodbye ryan...















app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`App is listening on ${PORT}`));

