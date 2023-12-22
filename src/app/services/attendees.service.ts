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

  registerAttendee(attendeeInfos: any) {
    const formData = new FormData();

    formData.append('email', attendeeInfos.email);
    formData.append('firstName', attendeeInfos.firstName);
    formData.append('lastName', attendeeInfos.lastName);
    formData.append('diplomaId', attendeeInfos.diploma);
    formData.append('regionalCode', attendeeInfos.region);
    formData.append('isIrlAttendee', attendeeInfos.isIrlAttendee);
    formData.append('virtualTourSatisfaction', attendeeInfos.virtualTourSatisfaction);
    formData.append('websiteSatisfaction', attendeeInfos.websiteSatisfaction);

    return this.http.post<any>(this.baseApiUrl + 'registerAttendee', formData);
  }
}
