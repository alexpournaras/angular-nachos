import { Component, HostListener, OnInit, AfterViewChecked } from '@angular/core';
import { ApiService } from '../../api.service';
import { Person } from '../../person';

@Component({
  selector: 'popular-actors',
  templateUrl: './popular-actors.component.html',
  styleUrls: ['./popular-actors.component.css']
})
export class PopularActorsComponent implements OnInit, AfterViewChecked {
  popularActors: Person[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.people$.subscribe((data: { [id: string]: Person }) => {

      for (const [person_id, person] of Object.entries(data)) {
        if (person.role == 'actor') {
          person['id'] = person_id;
          this.popularActors.push(person)
        }
      }
      
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setRightColumnHeight();
  }

  ngAfterViewChecked() {
    this.setRightColumnHeight();
  }

  setRightColumnHeight() {
    const popularMoviesElement = document.querySelector('.popular-movies') as HTMLElement;
    const popularMoviesHeight = popularMoviesElement ? popularMoviesElement.offsetHeight : 0;

    const actorsElement = document.querySelector('.actors') as HTMLElement;
    actorsElement.style.maxHeight = (popularMoviesHeight - 10) + "px";
  }
}