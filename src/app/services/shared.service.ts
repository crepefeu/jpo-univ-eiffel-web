import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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

  downLoadFile(fileName: any) {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = environment.documentsUrl + fileName;
    link.download = environment.documentsUrl + fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
}
}
