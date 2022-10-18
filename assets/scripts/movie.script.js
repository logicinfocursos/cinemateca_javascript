let page
const tmdbUri = 'https://api.themoviedb.org/3/movie/'
const tmdbUriMovie = 'https://www.themoviedb.org/movie/'
const api_key = 'de06b36687693115c9ea4cbf858e4c1a'
const language = 'pt-br'
const imagePath = 'https://image.tmdb.org/t/p/original'
const textLimit = 100



const fechtMovieData = () => {
    const objUrlParams = new URLSearchParams(window.location.search)

    fetch(`${tmdbUri + objUrlParams.get('id')}?api_key=${api_key}&language=${language}`)
        .then((response) => response.json())
        .then((data) => displayMovie(data))
}



const displayMovie = (data) => {
    console.log('>>> displayMovie: data', data)
    console.log('>>> displayMovie: data.original_title', data.original_title)

    const poster = `<img class="card-img-top mb-5 mb-md-0" src="${imagePath + data.poster_path}" alt="capa do filme" target="_blank"/>`

    document.getElementById("movie_poster").innerText = ''
    document.getElementById("movie_poster").insertAdjacentHTML('afterbegin', poster)

    const movieDetails = `<div class="small mb-1">fonte: <a href="${tmdbUriMovie + data.id}" target="_blank">TMDB</a></div>` +
        `<h1 class="">${data.original_title}</h1>` +
        `<h6 class="mb-5">${data.title}</h6>` +
        `<p class="lead">${data.overview}</p>` +

        `<a href="${tmdbUriMovie + data.id}" class="btn btn-outline-dark" target="_blank">ver no TMDB </a>`

    document.getElementById("movieDetails").innerText = ''
    document.getElementById("movieDetails").insertAdjacentHTML('afterbegin', movieDetails)
}