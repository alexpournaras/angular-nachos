import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie';

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
    for (const movie of movies) {
      popularMovies.push(movie)
    }

    // Featured movies component has the top 6 movies based on score,
    // This component uses the next 12 movies based on score.
    popularMovies.sort((a, b) => b.score - a.score);
    this.popularMovies = popularMovies.slice(6, 18);
  }

}
