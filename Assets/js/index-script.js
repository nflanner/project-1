var genreEl = document.querySelector('select');
var imdbScoreEl = document.querySelector('#imdb');
var reelScoreEl = document.querySelector('#reel');
var startRouletteEl = document.getElementById('start');
var additionalEl = document.querySelector('#additional');
var movieDescEl = document.querySelector('#movie-desc');
var movieImgEl = document.querySelector('#img-el');

var genres = ['Action', 'Comedy', 'Drama', 'Family', 'Horror', 'Romance', 'Science-Fiction'];
var selectionTitle = '';
// 0: {id: 28, name: 'Action'}
// 1: {id: 12, name: 'Adventure'}
// 2: {id: 16, name: 'Animation'}
// 3: {id: 35, name: 'Comedy'}
// 4: {id: 80, name: 'Crime'}
// 5: {id: 99, name: 'Documentary'}
// 6: {id: 18, name: 'Drama'}
// 7: {id: 10751, name: 'Family'}
// 8: {id: 14, name: 'Fantasy'}
// 9: {id: 36, name: 'History'}
// 10: {id: 27, name: 'Horror'}
// 11: {id: 10402, name: 'Music'}
// 12: {id: 9648, name: 'Mystery'}
// 13: {id: 10749, name: 'Romance'}
// 14: {id: 878, name: 'Science Fiction'}
// 15: {id: 10770, name: 'TV Movie'}
// 16: {id: 53, name: 'Thriller'}
// 17: {id: 10752, name: 'War'}
// 18: {id: 37, name: 'Western'}

// start the roulette
function handleStart(event) {
    event.preventDefault();
    movieDescEl.textContent = '';
    movieImgEl.setAttribute('src',"./Assets/images/rouletteWheel.jpg");
    // get genre
    var genreInput = genreEl.value;
    if (genreInput == 'Genre') {
        genreInput = 35;
    }
    console.log(genreInput);
    getMovieInfo(genreInput);
}

function handleAdditional(event) {
    event.preventDefault();
    if (selectionTitle !== '') {
        var redirectURL = './Assets/html/index-2.html?title=' + selectionTitle;
        // document.location.replace(redirectURL);
        window.open(redirectURL, '_blank');
    }
}

function getMovieInfo(genre) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'advanced-movie-search.p.rapidapi.com',
            'X-RapidAPI-Key': '6f355ce536msh022738caeb09df7p10395djsn758869b689a1'
        }
    };
    
    // rand numb from 1 to 100
    var pageNum = randomNum(100) + 1;
    // rand num from 0 to 20
    var movieSelectionNum = randomNum(19);

    fetch('https://advanced-movie-search.p.rapidapi.com/discover/movie?with_genres=' + genre + '&page=' + pageNum, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var movieSelection = data.results[movieSelectionNum];
            selectionTitle = movieSelection.title;
            console.log(selectionTitle);
            console.log(movieSelection);

            hydrate(movieSelection);
        })
        .catch(err => console.error(err));
}

// rand number from 0 to max
function randomNum(max) {
    return Math.floor(Math.random() * (max + 1));
}

function hydrate(movie) {
    movieDescEl.textContent = movie.overview;
    movieImgEl.setAttribute('src', movie.poster_path);
}

startRouletteEl.addEventListener("click", handleStart);
additionalEl.addEventListener("click", handleAdditional);
