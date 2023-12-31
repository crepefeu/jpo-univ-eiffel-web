import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly themeChanges$ = new Subject<boolean>();
  private readonly dataChanges$ = new Subject<boolean>();

  constructor() {}

  changeTheme(isDarkModeToggled: boolean) {
    this.themeChanges$.next(isDarkModeToggled);
  }

  themeChanges(): Observable<boolean> {
    return this.themeChanges$.asObservable();
  }

  updateData(dataChanged: boolean) {
    this.dataChanges$.next(dataChanged);
  }

  dataChanges(): Observable<boolean> {
    return this.dataChanges$.asObservable();
  }

}
