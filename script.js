const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f063e973cfb366b887b9fce2c59f419f&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f063e973cfb366b887b9fce2c59f419f&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)

    // console.log(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.map((movie) => {
        main.innerHTML += `
            <div class='movie'>
                <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
                </div>
                <div class="overview">
                <h3>Overview</h3>
                    ${movie.overview}
                </div>
            </div>
        `;
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload();
    }
})