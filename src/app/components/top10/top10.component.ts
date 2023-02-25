import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'top-10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.css']
})
export class Top10Component implements OnInit {
  movies: Movie[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    let people = await this.apiService.getPeople();
    let movies = await this.apiService.getMovies();
    movies = movies.sort((a, b) => b.score - a.score);
    movies = movies.slice(0, 10);
    
    for (let movie of movies) {
      movie.castFullDetails = [];
      for (let actor of movie.cast) {
        let person = people.find(person => person.name === actor);
        if (person) {
          movie.castFullDetails.push(person);
        } else {
          movie.castFullDetails.push({
            id: '',
            bio: '',
            imageUrl: 'assets/person_template.jpg',
            name: actor,
            role: 'actor',
            missing: true
          })
        }
      }
    }

    this.movies = movies;
  }
}