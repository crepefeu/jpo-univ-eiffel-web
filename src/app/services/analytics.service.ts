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
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    return this.http.get<any>(this.baseApiUrl + 'getLatestSnapshot', {headers: headers});
  }

  getAllSnapshots() {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    return this.http.get<any>(this.baseApiUrl + 'getAllSnapshots', {headers: headers});
  }
}
