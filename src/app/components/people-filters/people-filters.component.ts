import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'people-filters',
  templateUrl: './people-filters.component.html',
  styleUrls: ['./people-filters.component.css']
})
export class PeopleFiltersComponent implements OnInit {
  showDropdown: boolean = false;
  selectedSort: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const sortParam = queryParams.get('sort');
      if (sortParam) this.selectedSort = sortParam;
      else this.selectedSort = '';
    });
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.showDropdown) return;
    
    const dropdown = event.target as HTMLElement;
    if (dropdown.closest('.filter-dropdown, .actors-filter-dropdown-button')) return;

    this.showDropdown = false;
  }
}
