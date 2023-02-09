import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get('https://city-assignment.firebaseio.com/movies.json');
  }

  //https://city-assignment.firebaseio.com/movies.json


}
