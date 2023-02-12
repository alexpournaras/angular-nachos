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

  async ngOnInit() {
    const movies = await this.apiService.getMovies();
    
    let featuredMovies = [];
    for (const [movie_id, movie] of Object.entries(movies)) {
      movie['id'] = movie_id;
      featuredMovies.push(movie)
    }

    featuredMovies.sort((a, b) => b.score - a.score);
    this.featuredMovies = featuredMovies.slice(0, 6);
  }
  
}
