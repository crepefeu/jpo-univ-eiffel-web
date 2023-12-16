import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AttendeesService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllAttendees() {
    return this.http.get<any>(this.baseApiUrl + 'getAllAttendees');
  }
}
