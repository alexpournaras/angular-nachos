import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private moviesSubject = new Subject<any>();
  movies$ = this.moviesSubject.asObservable();

  private peopleSubject = new Subject<any>();
  people$ = this.peopleSubject.asObservable();

  private genresSubject = new Subject<any>();
  genres$ = this.genresSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllMovies() {
    this.http.get('https://city-assignment.firebaseio.com/movies.json').subscribe(movies => {
      this.moviesSubject.next(movies);
    });
  }

  getAllPeople() {
    this.http.get('https://city-assignment.firebaseio.com/people.json').subscribe(people => {
      this.peopleSubject.next(people);
    });
  }

  getAllGenres() {
    this.http.get('https://city-assignment.firebaseio.com/genres.json').subscribe(genres => {
      this.genresSubject.next(genres);
    });
  }
}
