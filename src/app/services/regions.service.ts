import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllRegions() {
    return this.http.get<any>(this.baseApiUrl + 'getAllRegions');
  }
}
