import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchString = new BehaviorSubject('');
  getSearchString = this.searchString.asObservable();

  constructor() { }

  setSearchString(searchString: string) {
    this.searchString.next(searchString);
  }
}
