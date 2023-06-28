// API key a8f8098c
let currentMovieId = ""

async function getMovies(title){
    const res = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=a8f8098c`)
    const data = await res.json()
    document.getElementById("movies-container").innerHTML = ""
    if(data.Search){
        for (let movie of data.Search){
            getMovieHtml(movie.imdbID)
        }
    } else {
        document.getElementById("movies-container").innerHTML = 
        `<h2 id="not-found" class="placeholder-text">Unable to find what you’re looking for. Please try another search.</h2>` 
    }
}

function getMovieHtml(id){
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=a8f8098c`) 
        .then(res => res.json())
        .then(data => { 
            let html = `
                <div class="movie">
                    <img class="movie-poster" src="${data.Poster}" alt="Movie poster">
                    <div class="movie-text">
                        <div class="movie-header">
                            <h2 class="movie-title">${data.Title}</h2>
                            <div class="movie-rating">
                                <img class="star" src="images/star.svg">
                                <p class="score">${data.imdbRating}</p>
                            </div>
                        </div>
                        <div class="movie-details">
                            <p class="runtime">${data.Runtime}</p>
                            <p class="genre">${data.Genre}</p>
                            <div class="watchlist-add" data-movie-id="${id}">
                                <img class="add add-icon" src="images/add.svg">
                                <p class="add">Watchlist</p>
                            </div>
                        </div>
                        <p class="movie-plot">
                            ${data.Plot}
                        </p>
                    </div>
                </div>
                `  
            document.getElementById("movies-container").innerHTML += html    
        })     
}



document.addEventListener("submit",(e) => {
    e.preventDefault()
    let inputValue = document.getElementById("searchbar-input").value
    if(inputValue)
    getMovies(inputValue)
    document.getElementById("searchbar-input").value = ""
})

document.addEventListener("click", (e) => {
    let moviesCount = localStorage.length
    if(e.target.classList["0"] == "add"){
        if (localStorage.length == 0){
            localStorage.setItem(`movie${localStorage.length}`, e.target.parentNode.dataset.movieId)
        } else {
            let larger = 0
            for (let i = 0; i < localStorage.length; i++){
                if (larger < Number(localStorage.key(i).replace("movie", ""))){
                    larger = i
                }
            }
            let lastMovie = Number(localStorage.key(larger).replace("movie", ""))
            localStorage.setItem(`movie${lastMovie + 1}`, e.target.parentNode.dataset.movieId)
        }
    }
})

