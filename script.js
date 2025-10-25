const overlay = document.getElementById('modal-overlay');
const searchButton = document.getElementById('search-button');


function searchButtonClickHandler() {
    overlay.classList.add('open');
}

searchButton.addEventListener('click', searchButtonClickHandler)