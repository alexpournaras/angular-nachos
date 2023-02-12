import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.css']
})
export class MoviesFiltersComponent implements OnInit {
  yearsList: number[] = [];
  genresList: string[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    let movies = await this.apiService.getMovies();
    let genres = await this.apiService.getGenres();

    for (const movie of movies) {
      if (!this.yearsList.includes(movie.releaseYear)) this.yearsList.push(movie.releaseYear);
    }

    this.yearsList.sort((a: number, b: number) => (b >= a) ? 1 : -1);

    for (const genre of Object.keys(genres)) {
      if (!this.genresList.includes(genre)) this.genresList.push(genre);
    }
  }

  showGenres: boolean = false;
  showYear: boolean = false;
  showSort: boolean = false;

  toggleGenresDropdrown() {
    this.showGenres = !this.showGenres;
    this.showYear = false;
    this.showSort = false;
  }

  toggleYearDropdrown() {
    this.showYear = !this.showYear;
    this.showGenres = false;
    this.showSort = false;
  }

  toggleSortDropdrown() {
    this.showSort = !this.showSort;
    this.showYear = false;
    this.showGenres = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.showGenres && !this.showYear && !this.showSort) return;
    
    const dropdown = event.target as HTMLElement;
    if (dropdown.closest('.filter-dropdown, .movies-filter-dropdown-button')) return;

    this.showGenres = false;
    this.showYear = false;
    this.showSort = false;
  }
}
