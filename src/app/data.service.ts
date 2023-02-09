import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllMovies() {
    this.http.get('https://city-assignment.firebaseio.com/movies.json').subscribe(data => {
      this.dataSubject.next(data);
    });
  }


  //https://city-assignment.firebaseio.com/movies.json


}
