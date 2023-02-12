import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private movies: Movie[] = [];
  private people: Person[] = [];
  private genres: {} = {};
  
  constructor(private http: HttpClient) { }

  async fetchMovies() {
    await this.http.get<{ [id: string]: Movie }>('https://city-assignment.firebaseio.com/movies.json')
      .toPromise()
      .then((data: { [id: string]: Movie } | undefined) => {
        if (data) {
          this.movies = [];

          for (const [movie_id, movie] of Object.entries(data)) {
            movie['id'] = movie_id;
            this.movies.push(movie)
          }
        }
      });
  }

  async fetchPeople() {
    await this.http.get<{ [id: string]: Person }>('https://city-assignment.firebaseio.com/people.json')
      .toPromise()
      .then((data: { [id: string]: Person } | undefined) => {
        if (data) {
          this.people = [];
          
          for (const [person_id, person] of Object.entries(data)) {
            person['id'] = person_id;
            this.people.push(person)
          }
        }
      });
  }

  async fetchGenres() {
    await this.http.get('https://city-assignment.firebaseio.com/genres.json')
      .toPromise()
      .then((data) => {
        if (data) this.genres = data;
      });
  }

  async getMovies() {
    return this.movies;
  }

  async getPeople() {
    return this.people;
  }

  async getGenres() {
    return this.genres;
  }
}
