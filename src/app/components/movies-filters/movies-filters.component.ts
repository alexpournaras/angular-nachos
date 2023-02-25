import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.css']
})
export class MoviesFiltersComponent implements OnInit {
  genresList: string[] = [];
  yearsList: number[] = [];
  selectedGenres: string[] = [];
  selectedYears: string[] = [];
  selectedSort: string = '';
  searchTerm: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private searchService: SearchService) { }

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

    this.searchService.setSearchTerm('');

    this.route.queryParamMap.subscribe(queryParams => {
      const genresParam = queryParams.get('genres');
      if (genresParam) this.selectedGenres = genresParam.split(',');
      else this.selectedGenres = [];

      const yearsParam = queryParams.get('years');
      if (yearsParam) this.selectedYears = yearsParam.split(',');
      else this.selectedYears = [];

      const sortParam = queryParams.get('sort');
      if (sortParam) this.selectedSort = sortParam;
      else this.selectedSort = '';
    });
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

  onGenresCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedGenres.push(event.target.value);
    } else {
      this.selectedGenres = this.selectedGenres.filter(genre => genre !== event.target.value);
    }
  }

  onYearsCheckboxChange(event: any) {
    if (event.target.checked) {
      this.selectedYears.push(event.target.value);
    } else {
      this.selectedYears = this.selectedYears.filter(year => year !== event.target.value);
    }
  }

  onSortChange(sort: string) {
    this.selectedSort = sort;
  }

  onFilterSubmit() {
    this.router.navigate(['/movies'], { queryParams: { genres: this.selectedGenres.join(','), years: this.selectedYears.join(','), sort: this.selectedSort } });
  }

  searchMovies() {
    this.searchService.setSearchTerm(this.searchTerm);
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
