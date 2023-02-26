import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie';

@Component({
  selector: 'person-known-for',
  templateUrl: './person-known-for.component.html',
  styleUrls: ['./person-known-for.component.css']
})
export class PersonKnownForComponent implements OnInit {
  personId: string | null = '';
  moviesKnownFor: Movie[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = params['id'];
      this.updateMoviesKnownFor();
    });
  }

  async updateMoviesKnownFor() {
    // Get the movies the person is known for based on the movies he/she played or directed
    const people = await this.apiService.getPeople();
    const movies = await this.apiService.getMovies();
    const person = people.find(person => person.id === this.personId);
    
    let moviesKnownFor = [];
    if (person) {
      for (const movie of movies) {
        if (movie.directorId == this.personId || movie.cast.includes(person.name)) {
          moviesKnownFor.push(movie);
        }
      }
    }

    // Component should show only the top 6 movies
    moviesKnownFor.sort((a, b) => b.score - a.score);
    this.moviesKnownFor = moviesKnownFor.slice(0, 6);
  }

}