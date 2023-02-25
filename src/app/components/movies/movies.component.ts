import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genres: string[] = [];
  years: string[] = [];
  sort: string = '';
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private searchService: SearchService) { }

  async ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const genresParam = queryParams.get('genres');
      if (genresParam) this.genres = genresParam.split(',');
      else this.genres = [];

      const yearsParam = queryParams.get('years');
      if (yearsParam) this.years = yearsParam.split(',');
      else this.years = [];

      const sortParam = queryParams.get('sort');
      if (sortParam) this.sort = sortParam;
      else this.sort = '';

      this.updateMovies();
    });

    this.searchService.getSearchTerm().subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.updateMovies();
    });
  }

  async updateMovies() {
    const movies = await this.apiService.getMovies();
    let filteredMovies = movies;
    this.movies = [];

    if (this.genres.length > 0) {
      filteredMovies = filteredMovies.filter(movie => {
        return movie.genres.some(genre => this.genres.includes(genre));
      });
    }

    if (this.years.length > 0) {
      filteredMovies = filteredMovies.filter(movie => {
        return this.years.includes(movie.releaseYear.toString());
      });
    }

    if (this.sort == 'Name') {
      filteredMovies = filteredMovies.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        else return 0;
      });
    } else if (this.sort == 'IMDB') {
      filteredMovies.sort((a, b) => b.score - a.score);
    } else if (this.sort == 'Release Year') {
      filteredMovies.sort((a, b) => b.releaseYear - a.releaseYear);
    }

    if (this.searchTerm != '') {
      filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    
    for (const movie of filteredMovies) {
      this.movies.push(movie)
    }
  }

}