import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');

  getSearchTerm() {
    return this.searchTerm.asObservable();
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm.next(searchTerm);
  }
}
