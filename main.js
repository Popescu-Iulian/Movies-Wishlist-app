const TITLE = document.querySelector('#title');
const GENRE = document.querySelector('#genre');
const YEAR = document.querySelector('#year');
const MOVIES_LIST = document.querySelector('#movies-list');
const MOVIES_FORM = document.querySelector('#movies-form');
const DIV_CONTAINER = document.querySelector('.container');

class Movie {
  constructor(title, genre, year) {
    this.title = title;
    this.genre = genre;
    this.year = year;
  }
}

class MoviesList {
  addMovieToList(movie) {
    const ROW = document.createElement('tr');
    ROW.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.genre}</td>
      <td>${movie.year}</td>
      <td><a href="#" class="delete">X</a></td>
    `;

    MOVIES_LIST.appendChild(ROW);
  }

  clearInputs() {
    TITLE.value = '';
    GENRE.value = '';
    YEAR.value = '';
  }

  displayAlert(message, className) {
    const ERROR_MSG = document.createElement('H6');

    ERROR_MSG.innerText = `${message}`;
    ERROR_MSG.className = `alert ${className}`;

    DIV_CONTAINER.insertBefore(ERROR_MSG, MOVIES_FORM);

    setTimeout(() => { ERROR_MSG.remove(); }, 2000);
  }
}

function submitMovie(event) {
  event.preventDefault();

  const MOVIE = new Movie(TITLE.value, GENRE.value, YEAR.value);

  const LIST = new MoviesList();

  if (TITLE.value === '' || GENRE.value === '' || YEAR.value === '') {
    LIST.displayAlert('Please fill in all inputs', 'error');
  } else {
    LIST.displayAlert('Movie added', 'success');
    LIST.addMovieToList(MOVIE);
    LIST.clearInputs();
  }
}