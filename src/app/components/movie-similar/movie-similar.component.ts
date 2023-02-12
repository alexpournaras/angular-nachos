import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { BroadcastService } from '../../broadcast.service';
import { Movie } from '../../movie';

@Component({
  selector: 'movie-similar',
  templateUrl: './movie-similar.component.html',
  styleUrls: ['./movie-similar.component.css']
})
export class MovieSimilarComponent implements OnInit {
  movieId: string | null = '';
  similarMovies: Movie[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private broadcastService: BroadcastService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.updateSimilarMovies();
    });
  }

  async updateSimilarMovies() {
    this.similarMovies = [];
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

      this.similarMovies.sort((a, b) => b.score - a.score);
      this.similarMovies = this.similarMovies.slice(0, 6);
      window.scrollTo(0, 0);
    }
  }
}