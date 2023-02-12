import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.movies$.subscribe((data: { [id: string]: Movie }) => {

      for (const [movie_id, movie] of Object.entries(data)) {
        movie['id'] = movie_id;
        this.movies.push(movie)
      }

    });
  }

}