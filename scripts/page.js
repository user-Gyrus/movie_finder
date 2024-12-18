//select an endpoint for the API
//http://www.omdbapi.com/?apikey=5810b0c&s=mummy
//api key - 5810b0c

document.addEventListener("DOMContentLoaded", () => {
  const movieForm = document.getElementById("form_field");
  const movieResult = document.getElementById("results-section");
  movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movieName = document.getElementById("input_data").value;
    console.log(movieName);
    searchMovie(movieName);
  });

  async function searchMovie(movieName) {
    try {
      const api_data = await fetch(
        `https://www.omdbapi.com/?apikey=5810b0c&s=${movieName}`
      );
      const data = await api_data.json();
      if (data.Response === "False") {
        throw new Error("No movies found");
      }
      displayMovie(data.Search);
      console.log(api_data);
      console.log(data);
    } catch (error) {
      movieResult.innerHTML = `
            <div class="error-message">
                Error in searching the movies. Please try again.
            </div>
        `;
    }
  }

  function displayMovie(movie) {
    // movieResult.innerHTML = `
    //     <div class="js-final-data">
    //         ${movie.map(
    //           (movieName) => `
    //                 <div class="movie-card">
    //                     <img
    //                         src="${movieName.Poster}"
    //                         alt="${movieName.Title}"
    //                         class="movie-poster"
    //                     />
    //                     <div class="movie-info">
    //                         <h3 class="movie-title">${movieName.Title}</h3>
    //                         <div class="movie-year">${movieName.Year}</div>
    //                     </div>
    //                 </div>
    //             `
    //         )}
    //     </div>
    // `;

    let htmlData = "";
    movie.forEach((movieName) => {
      htmlData += `
            <div class="js-final-data">
                <div class="movie-card">
                    <img 
                        src="${movieName.Poster}"
                        alt="${movieName.Title}"
                        class="movie-poster"
                    />
                    <div class="movie-info">
                        <h3 class="movie-title">${movieName.Title}</h3>
                        <div class="movie-year">${movieName.Year}</div>
                    </div>
                </div>
        </div>
        `;
    });
    movieResult.innerHTML = htmlData;
  }
});
