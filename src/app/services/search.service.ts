import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // This service is for bot movies and people filters components
  private searchTerm = new BehaviorSubject<string>('');

  getSearchTerm() {
    return this.searchTerm.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }
}
