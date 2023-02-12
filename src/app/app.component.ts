import { Component } from '@angular/core';
import { ApiService } from './api.service';
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
    
    await this.apiService.fetchMovies();
    await this.apiService.fetchPeople();
    await this.apiService.fetchGenres();
    
    this.initiallized = true;
    this.spinner.hide();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}