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


  //https://city-assignment.firebaseio.com/movies.json


}
