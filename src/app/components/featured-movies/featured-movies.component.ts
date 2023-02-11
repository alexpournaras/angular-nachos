import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'featured-movies',
  templateUrl: './featured-movies.component.html',
  styleUrls: ['./featured-movies.component.css']
})
export class FeaturedMoviesComponent implements OnInit {
  featuredMovies: Movie[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.movies$.subscribe((data: { [id: string]: Movie }) => {

      // TODO: Remove this when image becames available
      delete data['movie002'];

      let featuredMovies = [];

      for (const [movie_id, movie] of Object.entries(data)) {
        movie['id'] = movie_id;
        featuredMovies.push(movie)
      }

      featuredMovies.sort((a, b) => b.score - a.score);
      this.featuredMovies = featuredMovies.slice(0, 6);
    });
  }

}
