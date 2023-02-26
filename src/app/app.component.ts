import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initiallized: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show();
    
    // Initialize fetch of http requests
    await this.apiService.fetchMovies();
    await this.apiService.fetchPeople();
    await this.apiService.fetchGenres();
    await this.apiService.fetchReviews();
    
    this.initiallized = true;
    this.spinner.hide();

    // Scroll to top everytime user changes route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}