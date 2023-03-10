import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'movie-cast',
  templateUrl: './movie-cast.component.html',
  styleUrls: ['./movie-cast.component.css']
})
export class MovieCastComponent implements OnInit {
  movieId: string | null = '';
  cast: Person[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.updateMovieCast();
    });
  }

  async updateMovieCast() {
    this.cast = [];
    const people = await this.apiService.getPeople();
    const movies = await this.apiService.getMovies();
    const movie = movies.find(movie => movie.id === this.movieId);
    // Create the cast array by filtering the current movie cast and the people array

    if (movie) {
      for (const actor of movie.cast) {
        const person = people.find(person => person.name === actor);
        if (person) {
          this.cast.push(person);
        } else {
          // If person not found, add an empty person object with default image
          this.cast.push({
            id: '',
            bio: '',
            imageUrl: 'assets/person_template.jpg',
            name: actor,
            role: 'actor',
            missing: true
          })
        }
      }

      const director = people.find(person => person.name === movie.director);
      if (director) this.cast.push(director);
    }
  }
}