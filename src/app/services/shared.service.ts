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

  private buildDownloadUrl(fileName: string): string {
    return `${environment.documentsUrl}${fileName}`;
  }

  async downLoadFile(fileName: string): Promise<void> {
    try {
      const url = this.buildDownloadUrl(fileName);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      throw error;
    }
  }
}
