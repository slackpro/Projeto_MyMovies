const overlay = document.getElementById('modal-overlay');
const searchButton = document.getElementById('search-button');
const movieTitleInput = document.getElementById('nome');
const movieYearInput = document.getElementById('ano');
const movieListContainer = document.getElementById('movie-list');

// let movieList = [];
let movieList = JSON.parse(localStorage.getItem('movieList')) ?? [];

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.Error) {
      throw new Error('Filme nao encontrado');
    }
    createModal(data);
    overlay.classList.add('open');
  } catch (error) {
    notie.alert({ type: 'error', text: error.message });
  }
}

function movieNameParameterGenerator() {
  if (movieTitleInput.value === '') {
    throw new Error('O nome do filme deve ser informado');
  }
  return movieTitleInput.value.split(' ').join('+');
}

function movieYearParameterGenerator() {
  if (movieYearInput.value === '') {
    return '';
  }
  if (
    isNaN(Number(movieYearInput.value)) ||
    movieYearInput.value.length !== 4
  ) {
    throw new Error('O ano do filme deve ser um número válido com 4 dígitos');
  }
  return `&y=${movieYearInput.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongsToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBelongsToThisMovie));
}

function updateUI(movieObject) {
  movieListContainer.innerHTML += `
    <article id="movie-card-${movieObject.imdbID}">
          <img src="${movieObject.Poster}" 
          alt="Poster de ${movieObject.Title}."
          />
          <button class="remove-button" onclick="{removeFilmFromList('${movieObject.imdbID}')}">
          <i class="bi bi-trash3"></i> Remover</button>
        </article>`;
}

function removeFilmFromList(id) {
  notie.confirm({
    text: 'Deseja remover o filme de sua lista?',
    submitText: 'Sim',
    cancelText: 'Não',
    submitCallback: function removeMovie() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      upateLocalStorage();
    },
  });
}

function upateLocalStorage() {
  localStorage.setItem('movieList', JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}

searchButton.addEventListener('click', searchButtonClickHandler);
