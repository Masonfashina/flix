const global = {
  currentPage: window.location.pathname,
};

//step3 = getting movies from tmdb and using terinary operators
//display 20 most popular movies

async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

//display 20 most popular TV shows

async function displayPopularshows() {
    const { results } = await fetchAPIData("tv/popular");
    results.forEach((show) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
      
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="${show.name}"
        />`
            : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${show.name}"
      />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small>
        </p>
      </div>
      `;
      document.querySelector("#popular-shows").appendChild(div);
    });
  }

//fetch data from TMDB API (step2)

async function fetchAPIData(endpoint) {
  const API_KEY = "e569b938dcaa2584818d411a6c150a5b";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

console.log(global.currentPage);

//show and hide spinner(step3 B)
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

//Highlight active link(step1B)

function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

//Init app(step1)
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      console.log("Home");
      break;
    case "/shows.html":
      displayPopularshows();
      break;
    case "/movie-details.html":
      console.log("Movie details");
      break;
    case "/tv-details.html":
      console.log("TV details");
      break;
    case "/search.html":
      console.log("Search Page");
      break;
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
