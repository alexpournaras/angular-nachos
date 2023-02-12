import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css']
})
export class PopularMoviesComponent implements OnInit {
  popularMovies: Movie[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    const movies = await this.apiService.getMovies();

    let popularMovies = [];
    for (const [movie_id, movie] of Object.entries(movies)) {
      movie['id'] = movie_id;
      popularMovies.push(movie)
    }

    popularMovies.sort((a, b) => b.score - a.score);
    this.popularMovies = popularMovies.slice(6, 18);
  }

}
