import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly themeChanges$ = new Subject<boolean>();

  constructor() { }

  changeTheme(isDarkModeToggled: boolean) {
    this.themeChanges$.next(isDarkModeToggled);
  }

  themeChanges(): Observable<boolean> {
    return this.themeChanges$.asObservable();
  }

}
