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

  async ngOnInit() {
    const movies = await this.apiService.getMovies();

    for (const [movie_id, movie] of Object.entries(movies)) {
      movie['id'] = movie_id;
      this.movies.push(movie)
    }

  }

}