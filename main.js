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

class DrawMoviesUI {
  addMovieToList(movie) {
    const ROW = document.createElement('tr');
    ROW.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.genre}</td>
      <td>${movie.year}</td>
      <td><a href="#" class="delete" onclick="deleteMovie(event)">X</a></td>
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

  deleteMovieFromList(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

class LocalStorage {
  static addMovie(movie) {
    let movies = LocalStorage.getMovie();

    movies.push(movie);

    localStorage.setItem('movies', JSON.stringify(movies));
  }

  static displayMovies() {
    let movies = LocalStorage.getMovie();

    movies.forEach(movie => {
      const LIST = new DrawMoviesUI();
      LIST.addMovieToList(movie);
    });
  }

  static getMovie() {
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    return movies;
  }

  static removeMovie(year) {
    let movies = LocalStorage.getMovie();

    movies.forEach((movie, index) => {
      if (movie.year === year) {
        movies.splice(index, 1);
      }
    });

    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

function submitMovie(event) {
  event.preventDefault();

  const MOVIE = new Movie(TITLE.value, GENRE.value, YEAR.value);

  const LIST = new DrawMoviesUI();

  if (TITLE.value === '' || GENRE.value === '' || YEAR.value === '') {
    LIST.displayAlert('Please fill in all inputs', 'error');
  } else {
    LIST.addMovieToList(MOVIE);
    LocalStorage.addMovie(MOVIE);

    LIST.displayAlert('Movie added', 'success');
    LIST.clearInputs();
  }
}

function deleteMovie(event) {
  event.preventDefault();

  const LIST = new DrawMoviesUI();

  LIST.deleteMovieFromList(event.target);

  LocalStorage.removeMovie(event.target.parentElement.previousElementSibling.textContent);

  LIST.displayAlert('Movie deleted!', 'success');
}