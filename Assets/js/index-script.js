var genreEl = document.querySelector('select');
var imdbScoreEl = document.querySelector('#imdb');
var reelScoreEl = document.querySelector('#reel');
var startRouletteEl = document.getElementById('start');
var additionalEl = document.querySelector('#additional');
var movieDescEl = document.querySelector('#movie-desc');
var movieImgEl = document.querySelector('#img-el');

var genres = ['Action', 'Comedy', 'Drama', 'Family', 'Horror', 'Romance', 'Science-Fiction'];
var selectionTitle = '';
var genreMap ={
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
}
var genreList=[];
var titleList=[];
var scoreList=[]; 
var saveObject={
    genre: [],
    title: [],
    score: [],
}
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
            var movieSelection = data.results[movieSelectionNum];
            selectionTitle = movieSelection.title;
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

  ////////////////////////////////////
  var movieTitleEl = document.querySelector('#title');
  var movieScoreEl = document.querySelector('#score');
  var movieGenreEl = document.querySelector('#genre-bottom');
  var savedBttnEl = document.querySelector('#save');
  var listEl=document.querySelector('#saved-list')

  savedBttnEl.addEventListener("click", handleSave);

function handleSave(event){
    event.preventDefault();
    var movieTitle = movieTitleEl.value; 
    var movieScore = movieScoreEl.value;
    var movieGenre = genreMap[movieGenreEl.value];

    titleList.push(movieTitle);
    scoreList.push(movieScore);
    genreList.push(movieGenre);
    saveToLocal();
    appendList(movieTitle, movieScore, movieGenre);
}

function saveToLocal(){

    for(var i=0;i<titleList.length;i++){

        if(!saveObject["title"].includes(titleList[i])){
            saveObject["title"].push(titleList[i])
            saveObject["score"].push(scoreList[i])
            saveObject["genre"].push(genreList[i])

        }
    
    }

    var saveJSON=JSON.stringify(saveObject)
    localStorage.setItem("saveObject",saveJSON)
} 

function pullStorage(){

    var saveString=localStorage.getItem("saveObject")
    var parsedSave=JSON.parse(saveString)
    if (parsedSave) {
        for (var i = 0; i < parsedSave["title"].length; i++) {
            titleList.push(parsedSave["title"][i])
            scoreList.push(parsedSave["score"][i])
            genreList.push(parsedSave["genre"][i])

        }
    }
}

function appendList(movieTitle, movieScore, movieGenre){
    var listData=document.createElement('li')
    listData.setAttribute('class',"list-group-item text-dark")
    
    var listString='Title: '+movieTitle+', Score: '+movieScore+', Genre: '+movieGenre
    listData.textContent=listString
    listEl.appendChild(listData)

}

function populateList(){

    for(var i=0;i<titleList.length;i++){
        appendList(titleList[i],scoreList[i],genreList[i])
    }
}

pullStorage();
populateList()
