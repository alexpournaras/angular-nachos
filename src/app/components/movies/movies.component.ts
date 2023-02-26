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
  moviesPerPage: number = 24;
  page: number = 1;
  totalPages: number = 1;
  pagination: number[] = [1];

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

      const pageParam = queryParams.get('page');
      if (pageParam) this.page = Number(pageParam);
      else this.page = 1;

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

    this.totalPages = filteredMovies.length / this.moviesPerPage;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.floor(this.totalPages + 1);
    }

    if (filteredMovies.length > this.moviesPerPage) {
      filteredMovies = filteredMovies.slice(this.page * this.moviesPerPage - this.moviesPerPage, this.page * this.moviesPerPage);
    }
    
    for (const movie of filteredMovies) {
      this.movies.push(movie)
    }

    this.pagination = [];
    if (this.totalPages == 0) this.totalPages = 1;
    for (let i = 1; i <= this.totalPages; i++) {
      this.pagination.push(i);
    }
  }

}