import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Person } from '../../person';

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    const people = await this.apiService.getPeople();

    for (const [person_id, person] of Object.entries(people)) {
      person['id'] = person_id;
      this.people.push(person)
    }

  }

}