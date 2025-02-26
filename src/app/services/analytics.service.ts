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
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getLatestSnapshot', { headers });
  }

  getAllSnapshots() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getAllSnapshots', { headers });
  }

  getAllAttendees() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getAllAttendees', { headers });
  }

  getDiplomaCategoriesAnalytics() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getDiplomaCategoriesAnalytics', { headers });
  }

  getDiplomasAnalytics() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getDiplomasAnalytics', { headers });
  }

  getMapAnalytics() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getMapAnalytics', { headers });
  }

  getSatisfactionAnalytics() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getSatisfactionAnalytics', { headers });
  }
}
