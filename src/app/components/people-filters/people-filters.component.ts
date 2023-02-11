import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'people-filters',
  templateUrl: './people-filters.component.html',
  styleUrls: ['./people-filters.component.css']
})
export class PeopleFiltersComponent {
  showDropdown: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.showDropdown) return;
    
    const dropdown = event.target as HTMLElement;
    if (dropdown.closest('.filter-dropdown, .actors-filter-dropdown-button')) return;

    this.showDropdown = false;
  }
}
