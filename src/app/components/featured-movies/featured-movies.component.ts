import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Movie } from '../../movie';


@Component({
  selector: 'featured-movies',
  templateUrl: './featured-movies.component.html',
  styleUrls: ['./featured-movies.component.css']
})
export class FeaturedMoviesComponent implements OnInit {
  movies: { [id: string]: Movie } = {};

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.movies = data;
    });
  }

  

}
