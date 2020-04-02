const TITLE = document.querySelector('#title');
const GENRE = document.querySelector('#genre');
const YEAR = document.querySelector('#year');
const MOVIES_LIST = document.querySelector('#movies-list');

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
}

function submitMovie(event) {
  event.preventDefault();

  const MOVIE = new Movie(TITLE.value, GENRE.value, YEAR.value);

  const LIST = new MoviesList();

  LIST.addMovieToList(MOVIE);

  LIST.clearInputs();
}