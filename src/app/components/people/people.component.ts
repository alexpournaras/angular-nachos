import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { SearchService } from '../../search.service';
import { Person } from '../../person';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  sort: string = '';
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private searchService: SearchService) { }

  async ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      const sortParam = queryParams.get('sort');
      if (sortParam) this.sort = sortParam;
      else this.sort = '';

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
    
    for (const person of filteredPeople) {
      this.people.push(person)
    }
  }

}