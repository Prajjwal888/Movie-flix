const movieSearchBox = document.getElementById('movie-search-box');
const button = document.querySelector('.search');
const searchElement = document.querySelector('.addMovies');
async function loadMoviesList(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=e563a8b5`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    return data;
}
async function loadMovies(imdbID) {
    const URL = `http://www.omdbapi.com/?i=${imdbID}&apikey=e563a8b5`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    return data;
}

button.addEventListener('click', async () => {
    const inputValue = movieSearchBox.value.trim();
    searchElement.innerHTML = " ";
    if (inputValue) {
        const detail = await loadMoviesList(inputValue);
        const arr = detail.Search;
        const container = document.createElement('div');
        searchElement.appendChild(container);
        const resultContainer = document.createElement('div');
        container.appendChild(resultContainer);
        for (let detailsList of arr) {
            const resultGrid = document.createElement('div');
            resultContainer.appendChild(resultGrid);
            const imdbID = detailsList.imdbID;
            const details = await loadMovies(imdbID);
            resultGrid.innerHTML = `
            <div class="movie-poster">
                <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${details.Title}</h3>
                <ul class="movie-misc-info">
                    <li class="year">Year: ${details.Year}</li>
                    <li class="rated">Ratings: ${details.Rated}</li>
                    <li class="released">Released: ${details.Released}</li>
                </ul>
                <p class="genre"><b>Genre:</b> ${details.Genre}</p>
                <p class="writer"><b>Writer:</b> ${details.Writer}</p>
                <p class="actors"><b>Actors:</b> ${details.Actors}</p>
                <p class="plot"><b>Plot:</b> ${details.Plot}</p>
                <p class="language"><b>Language:</b> ${details.Language}</p>
                <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
            </div>
        `;
        }
    } else {
        resultGrid.innerHTML = '<p>Please enter a movie name</p>';
    }
});
