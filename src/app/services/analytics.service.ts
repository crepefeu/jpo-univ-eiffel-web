import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  getLatestSnapshot() {
    return this.http.get<any>(this.baseApiUrl + 'getLatestSnapshot');
  }

  getAllSnapshots() {
    return this.http.get<any>(this.baseApiUrl + 'getAllSnapshots');
  }
}
