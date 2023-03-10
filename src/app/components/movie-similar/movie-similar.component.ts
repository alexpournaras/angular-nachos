import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'movie-similar',
  templateUrl: './movie-similar.component.html',
  styleUrls: ['./movie-similar.component.css']
})
export class MovieSimilarComponent implements OnInit {
  movieId: string | null = '';
  similarMovies: Movie[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.updateSimilarMovies();
    });
  }

  async updateSimilarMovies() {
    this.similarMovies = [];
    // Create the similar movies array based on the movies that have same genres
    const movies = await this.apiService.getMovies();
    const selectedMovie = movies.find(movie => movie.id === this.movieId);

    if (selectedMovie) {
      for (const movie of movies) {
        if (movie != selectedMovie) {
          for (const genre of movie.genres) {
            if (selectedMovie.genres.includes(genre) && !this.similarMovies.includes(movie)) {
              this.similarMovies.push(movie);
            }
          }
        }
      }

      // Show only the top 6 similar movies
      this.similarMovies.sort((a, b) => b.score - a.score);
      this.similarMovies = this.similarMovies.slice(0, 6);
    }
  }
}