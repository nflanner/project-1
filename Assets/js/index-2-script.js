var imageEl = document.querySelector('#img-el');
var titleEl = document.querySelector('#title')
var dateEl = document.querySelector('#date')
var plotEl = document.querySelector('#plot')
var writerEl = document.querySelector('#writer')
var actorsEl = document.querySelector('#actors')
var awardsEl = document.querySelector('#awards')
var genreEl = document.querySelector('#genre')
var ratedEl = document.querySelector('#rating')
var runtimeEl = document.querySelector('#runtime')
var imdbEl = document.querySelector('#imdb')
var dvdEl = document.querySelector('#dvd')

var queryString = document.location.search;
var title = getTitle(queryString);

var apiKey = '73ee7b17';

hydrate(title);

function hydrate(title) {

    fetch('http://www.omdbapi.com/?apikey=' + apiKey + '&t=' + title + '&plot=full')
        .then(response => response.json())
        .then(data => {
            var contentList = checkContent([
                data.Title,
                data.Released,
                data.Plot,
                data.Writer,
                data.Actors,
                data.Awards,
                data.Genre,
                data.Rated,
                data.Runtime,
                data.imdbRating,
                data.DVD
            ]);
            // set image
            imageEl.setAttribute('src', data.Poster);
            titleEl.textContent = contentList[0];
            dateEl.textContent = contentList[1];
            plotEl.textContent = contentList[2];
            writerEl.textContent = contentList[3];
            actorsEl.textContent = contentList[4];
            awardsEl.textContent = contentList[5];
            genreEl.textContent = contentList[6];
            ratedEl.textContent = contentList[7];
            runtimeEl.textContent = contentList[8];
            imdbEl.textContent = contentList[9];
            dvdEl.textContent = contentList[10];

        })
        .catch(err => console.error(err));
}

function getTitle(queryString) {
    var uneditTitle = queryString.split('=')[1];
    var title = '';
    if (uneditTitle.includes('%20')) {
        var decomposedName = uneditTitle.split('%20');
        for (var i = 0; i < decomposedName.length; i++) {
            if (i === 0) {
                title += decomposedName[i];
            } else {
                title += '+' + decomposedName[i];
            }
        }
    } else {
        title = uneditTitle;
    }
    return title;
}

function checkContent(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == null) {
            list[i] = 'N/A';
        }
    }
        return list;
}
