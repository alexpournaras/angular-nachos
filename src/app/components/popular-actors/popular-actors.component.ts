import { Component, HostListener, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'popular-actors',
  templateUrl: './popular-actors.component.html',
  styleUrls: ['./popular-actors.component.css']
})
export class PopularActorsComponent implements OnInit, AfterViewChecked {
  popularActors: Person[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    const people = await this.apiService.getPeople();

    for (const person of people) {
      if (person.role == 'actor') {
        this.popularActors.push(person)
      }
    }
      
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setRightColumnHeight();
  }

  ngAfterViewChecked() {
    this.setRightColumnHeight();
  }

  setRightColumnHeight() {
    // Keep right column's height always in match with the left column's height of popular movies component
    const popularMoviesElement = document.querySelector('.popular-movies') as HTMLElement;
    const popularMoviesHeight = popularMoviesElement ? popularMoviesElement.offsetHeight : 0;

    const actorsElement = document.querySelector('.actors') as HTMLElement;
    actorsElement.style.maxHeight = (popularMoviesHeight - 10) + "px";
  }
}