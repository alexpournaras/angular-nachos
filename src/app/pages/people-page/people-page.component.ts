import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.css']
})
export class PeoplePageComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAllPeople();
  }

}