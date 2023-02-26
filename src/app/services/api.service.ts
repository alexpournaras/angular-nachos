import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { Person } from '../interfaces/person';
import { Review } from '../interfaces/review';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Initiallization saves the repsonses here to perform fetch only once!
  private movies: Movie[] = [];
  private people: Person[] = [];
  private reviews: Review[] = [];
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

  async fetchReviews() {
    await this.http.get<{ [id: string]: Review }>('https://city-assignment.firebaseio.com/reviews.json')
      .toPromise()
      .then((data: { [id: string]: Review } | undefined) => {
        if (data) {
          this.reviews = [];
          
          for (const [review_id, review] of Object.entries(data)) {
            review['id'] = review_id;
            this.reviews.push(review)
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

  postReview(reviewData: any): Observable<any> {
    return this.http.post('https://city-assignment.firebaseio.com/reviews.json', reviewData)
      .pipe(
        tap(() => {
          this.reviews.push(reviewData);
        })
      );
  }

  async getMovies() {
    return this.movies;
  }

  async getPeople() {
    return this.people;
  }

  async getReviews() {
    return this.reviews;
  }

  async getGenres() {
    return this.genres;
  }
}
