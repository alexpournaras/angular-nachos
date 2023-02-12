import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'movie-content',
  templateUrl: './movie-content.component.html',
  styleUrls: ['./movie-content.component.css']
})
export class MovieContentComponent implements OnInit {
  movieId: string | null = '';
  movie: Movie = {
    id: '',
    cast: [],
    director: '',
    directorId: '',
    genres: [],
    imageUrl: '',
    releaseYear: 0,
    score: 0,
    summary: '',
    title: '',
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.updateMovieContent();
    });
  }

  async updateMovieContent() {
    const movies = await this.apiService.getMovies();
    const movie = movies.find(movie => movie.id === this.movieId);
    if (movie) this.movie = movie;
  }
}
