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

  ngOnInit() {
    this.apiService.people$.subscribe((data: { [id: string]: Person }) => {

      for (const [person_id, person] of Object.entries(data)) {
        person['id'] = person_id;
        this.people.push(person)
      }

    });
  }

}