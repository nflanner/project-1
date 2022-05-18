var genreEl = document.querySelector('#genre');
var imdbScoreEl = document.querySelector('#imdb');
var reelScoreEl = document.querySelector('#reel');
var startRouletteEl = document.querySelector('#start');

var genres = ['Action', 'Comedy', 'Drama', 'Family', 'Horror', 'Romance', 'Science-Fiction'];
var netflixKey = '6f355ce536msh022738caeb09df7p10395dj';

// start the roulette
function handleStart(event) {
    event.preventDefault();
    // get genre
    var genreInput = genreEl.textContent;
    console.log(genreInput)

}

startRouletteEl.addEventListener('click', handleStart);
