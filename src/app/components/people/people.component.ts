import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SearchService } from '../../services/search.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  sort: string = '';
  searchTerm: string = '';
  peoplePerPage: number = 24;
  page: number = 1;
  totalPages: number = 1;
  pagination: number[] = [1];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private searchService: SearchService) { }

  async ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const sortParam = queryParams.get('sort');
      if (sortParam) this.sort = sortParam;
      else this.sort = '';

      const pageParam = queryParams.get('page');
      if (pageParam) this.page = Number(pageParam);
      else this.page = 1;

      this.updatePeople();
    });

    this.searchService.getSearchTerm().subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.updatePeople();
    });
  }

  async updatePeople() {
    const people = await this.apiService.getPeople();
    let filteredPeople = people;
    this.people = [];

    if (this.sort == 'Name') {
      filteredPeople = filteredPeople.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        else return 0;
      });
    } else if (this.sort == 'Role') {
      filteredPeople = filteredPeople.sort((a, b) => {
        if (a.role < b.role) return -1;
        if (a.role > b.role) return 1;
        else return 0;
      });
    }

    if (this.searchTerm != '') {
      filteredPeople = filteredPeople.filter(person => person.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

    this.totalPages = filteredPeople.length / this.peoplePerPage;
    if (this.totalPages % 1 !== 0) {
      this.totalPages = Math.floor(this.totalPages + 1);
    }

    if (filteredPeople.length > this.peoplePerPage) {
      filteredPeople = filteredPeople.slice(this.page * this.peoplePerPage - this.peoplePerPage, this.page * this.peoplePerPage);
    }
    
    for (const person of filteredPeople) {
      this.people.push(person)
    }

    this.pagination = [];
    if (this.totalPages == 0) this.totalPages = 1;
    for (let i = 1; i <= this.totalPages; i++) {
      this.pagination.push(i);
    }
  }
}