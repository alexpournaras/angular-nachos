import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'person-more-people',
  templateUrl: './person-more-people.component.html',
  styleUrls: ['./person-more-people.component.css']
})
export class PersonMorePeopleComponent implements OnInit {
  personId: string | null = '';
  people: Person[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = params['id'];
      this.updateMorePeopleSection();
    });
  }

  async updateMorePeopleSection() {
    // Get more people based on the movies that the person has played or directed
    const movies = await this.apiService.getMovies();
    const people = await this.apiService.getPeople();
    const currentPerson = people.find(person => person.id === this.personId);
    this.people = [];
    if (currentPerson) {
      for (const movie of movies) {
        if (movie.cast.includes(currentPerson.name) || movie.directorId == this.personId) {
          for (const movie_person of movie.cast) {
            const currentMoviePerson = people.find(person => person.name === movie_person);
            if (currentMoviePerson && currentMoviePerson != currentPerson && !this.people.includes(currentMoviePerson)) this.people.push(currentMoviePerson)
          }
        }
      }
    }
  }

}
