const overlay = document.getElementById('modal-overlay');
const searchButton = document.getElementById('search-button');
const movieTitleInput = document.getElementById('nome');
const movieYearInput = document.getElementById('ano');

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

  // document.getElementById('modal-movie-title').textContent = data.Title || 'Título não encontrado';
  // document.getElementById('modal-movie-year').textContent = data.Year || 'Ano não encontrado';
  // document.getElementById('modal-movie-genre').textContent = data.Genre || 'Gênero não encontrado';
  // document.getElementById('modal-movie-director').textContent = data.Director || 'Diretor não encontrado';
  // document.getElementById('modal-movie-plot').textContent = data.Plot || 'Sinopse não encontrada';
  // document.getElementById('modal-movie-poster').src = data.Poster !== 'N/A' ? data.Poster : 'placeholder.jpg';
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

searchButton.addEventListener('click', searchButtonClickHandler);
