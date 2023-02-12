import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initiallized: boolean = false;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.apiService.fetchMovies();
    await this.apiService.fetchPeople();
    await this.apiService.fetchGenres();
    
    this.initiallized = true;
  }
}