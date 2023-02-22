import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Movie } from '../../movie';

@Component({
  selector: 'trending-10',
  templateUrl: './trending10.component.html',
  styleUrls: ['./trending10.component.css']
})
export class Trending10Component implements OnInit {
  movies: Movie[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    const movies = await this.apiService.getMovies();
    movies.sort((a, b) => b.score - a.score);
    this.movies = movies.slice(0, 10);
  }
}