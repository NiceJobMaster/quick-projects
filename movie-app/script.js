const moviesContainerEl = document.getElementById("movies-container");
const searchEl = document.getElementById("search");

const popularityLinkApi =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e312c408b2b5cbbb0b7e29d1eeeda31b&page=1";

const logJSONData = async (link) => {
  const response = await fetch(link);
  const jsonData = await response.json();
  moviesContainerEl.innerHTML = "";
  console.log(jsonData.results);
  jsonData.results.forEach((movie) => {
    moviesContainerEl.innerHTML += generateMovie(movie);
  });
};

const generateMovie = (movie) => {
  const imageSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    : "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg";
  return `<div class="movie"><img src="${imageSrc}" alt="movie"/><div class="title-container"><span class="title">${movie.title}</span><div class="rating"><span>${movie.vote_average}</span></div><div class="overview"><div class="overview-wrapper"><p>Overflow:</p><span>${movie.overview}</span></div></div></div></div>`;
};

logJSONData(popularityLinkApi);

searchEl.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && searchEl.value) {
    event.preventDefault();
    const searchLink = `https://api.themoviedb.org/3/search/movie?&api_key=e312c408b2b5cbbb0b7e29d1eeeda31b&query=${searchEl.value}`;
    logJSONData(searchLink);
  }
});
