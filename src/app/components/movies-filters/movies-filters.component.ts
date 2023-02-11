import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.css']
})
export class MoviesFiltersComponent {
  showGenres: boolean = false;
  showYear: boolean = false;
  showSort: boolean = false;

  showGenresDropdown() {
    this.showGenres = !this.showGenres;
    this.showYear = false;
    this.showSort = false;
  }

  showYearDropdown() {
    this.showYear = !this.showYear;
    this.showGenres = false;
    this.showSort = false;
  }

  showSortDropdown() {
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
