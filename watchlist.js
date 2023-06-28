let placeholder = document.getElementById("movies-container").innerHTML

function renderMovies() {
    let moviesCount = localStorage.length
    if (localStorage.length > 0){
         document.getElementById("movies-container").innerHTML = ""
    } else {
         document.getElementById("movies-container").innerHTML = placeholder
    }
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("movie")) {
            getMovieHtml(localStorage.getItem(key), key)
        }
    }
}

function getMovieHtml(id, movieNum){
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
                            <div class="watchlist-add" data-movie-id="${movieNum}">
                                <img class="add add-icon" src="images/remove.svg">
                                <p class="add">Remove</p>
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

document.addEventListener("click", (e) => {
    if(e.target.classList["0"] == "add"){
        localStorage.removeItem(e.target.parentNode.dataset.movieId)
    }
    renderMovies()
})

renderMovies()


