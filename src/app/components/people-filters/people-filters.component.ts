import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'people-filters',
  templateUrl: './people-filters.component.html',
  styleUrls: ['./people-filters.component.css']
})
export class PeopleFiltersComponent implements OnInit {
  showDropdown: boolean = false;
  selectedSort: string = '';
  searchTerm: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const sortParam = queryParams.get('sort');
      if (sortParam) this.selectedSort = sortParam;
      else this.selectedSort = '';
    });

    this.searchService.setSearchTerm('');
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSortChange(sort: string) {
    this.selectedSort = sort;
  }

  onFilterSubmit() {
    this.router.navigate(['/people'], { queryParams: { sort: this.selectedSort } });
  }

  searchPeople() {
    this.searchService.setSearchTerm(this.searchTerm);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.showDropdown) return;
    
    const dropdown = event.target as HTMLElement;
    if (dropdown.closest('.filter-dropdown, .actors-filter-dropdown-button')) return;

    this.showDropdown = false;
  }
}
