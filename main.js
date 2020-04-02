const TITLE = document.querySelector('#title');
const GENRE = document.querySelector('#genre');
const YEAR = document.querySelector('#year');

class Movie {
  constructor(title, genre, year) {
    this.title = title;
    this.genre = genre;
    this.year = year;
  }
}

class MovieList {
  addMovieToList(movie) {

  }
}

function submitMovie(event) {
  event.preventDefault();

  const MOVIE = new Movie(TITLE.value, GENRE.value, YEAR.value);

  const LIST = new MovieList();

  LIST.addMovieToList(MOVIE);

}