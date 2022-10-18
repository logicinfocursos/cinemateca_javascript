let page
const tmdbUri = 'https://api.themoviedb.org/3/movie/popular'
const api_key = 'de06b36687693115c9ea4cbf858e4c1a'
const language = 'pt-br'
const imagePath = 'https://image.tmdb.org/t/p/original'
const textLimit = 100



function startScreen() {
    page = 1
    paginationFill(page)
    fechtData(page)
}



function fechtData(p) {

        if (document.getElementById(`buttonItemPage_${page}`)) document.getElementById(`buttonItemPage_${page}`).classList.remove("active")

    page = p

    fetch(`${tmdbUri}?api_key=${api_key}&language=${language}&page=${page}`)
        .then((response) => response.json())
        .then((data) => readMovieList(data))

    if (document.getElementById(`buttonItemPage_${page}`)) document.getElementById(`buttonItemPage_${page}`).classList.add("active")
}



const readMovieList = (data) => {

    console.log('>>> readMovieList: data', data)
    console.log('>>> readMovieList: data.results', data.results)
    console.log('>>> readMovieList: data.results[0].overview', data.results[0].overview)

    const lista = data.results

    document.getElementById("gridList").innerText = ''
    document.getElementById("list").innerText = ''

    if (document.getElementById("loading")) document.getElementById("loading").style.display = 'block'

    if (lista && lista.length > 0) {
        data.results.map((item) => {

            let card = '<div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 col-xxl-2 gx-3 mb-3">' +
                `<a href="movie.html?id=${item.id}" class="d-block mb-4 h-100 text-decoration-none text-reset">` +
                '<div class="card h-100">' +
                `<img src="${imagePath + item.poster_path}" class="card-img-top" alt="capa do filme">` +
                '<div className="card-body">' +
                '<h5 class="card-title px-4 my-4">' + item.title + '</h5>' +
                '<p class="card-text px-4"><b>' + item.original_title + '</b></p>' +
                `<p class="card-text px-4"> ${item.release_date}</p>` +
                '</div>' +
                '</div>' +
                '</a>' +
                '</div>'

            let list = `<div class="card mb-3 px-3 py-3 col-12" style="border-radius: 10px">` +
                `<div class="card-header row">` +
                `<picture class="col-12 col-sm-12 col-md-12 col-lg-3">` +
                `<img src="${imagePath + item.poster_path}" class="img-fluid img-thumbnail" alt="capa do filme" style="max-height:500px">` +
                `</picture>` +
                `<div class="col-12 col-sm-12 col-md-12 col-lg-9">` +
                `<h1 class="mt-5">${item.title}</h1>` +
                `<p><b>${item.original_title}</b></p>` +
                `<p>${item.overview}</p>` +
                `<a class="btn btn-primary" href="movie.html?id=${item.id}">ver os detalhes</a>` +
                `</div>` +
                `</div>` +
                `</div>`

            document.getElementById("gridList").insertAdjacentHTML('afterbegin', card)
            document.getElementById("list").insertAdjacentHTML('afterbegin', list)

            if (document.getElementById("loading")) document.getElementById("loading").style.display = 'none'
        })
    }
}



const paginationFill = (page) => {

    let pagesControll = ''

    for (let p = 1; p <= 25; p++) {

        pagesControll += `<li class="page-item" id="buttonItemPage_${p}"><button class="page-link" onclick="fechtData(${p})">${p}</button></li>`
    }

    document.getElementById("pagination").innerText = ''
    document.getElementById("pagination").insertAdjacentHTML('afterbegin', pagesControll)
}



function clicked(option) {

    if (option == 'grid') {
        document.getElementById('grid').style.display = 'block'
        document.getElementById('list').style.display = 'none'

        document.getElementById('btn-grid').classList.remove("btn-outline-primary")
        document.getElementById('btn-grid').classList.add("btn-primary")

        document.getElementById('btn-list').classList.remove("btn-primary")
        document.getElementById('btn-list').classList.add("btn-outline-primary")

    } else {
        document.getElementById('grid').style.display = 'none'
        document.getElementById('list').style.display = 'block'

        document.getElementById('btn-grid').classList.remove("btn-primary")
        document.getElementById('btn-grid').classList.add("btn-outline-primary")

        document.getElementById('btn-list').classList.remove("btn-outline-primary")
        document.getElementById('btn-list').classList.add("btn-primary")
    }
}
