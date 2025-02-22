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
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'getAllAttendees', { headers });
  }

  registerAttendee(attendeeInfos: any) {
    const formData = new FormData();

    formData.append('email', attendeeInfos.email);
    formData.append('firstName', attendeeInfos.firstName);
    formData.append('lastName', attendeeInfos.lastName);
    formData.append('diplomaId', attendeeInfos.diplomaId);
    formData.append('diplomaCategoryId', attendeeInfos.diplomaCategoryId)
    formData.append('regionalCode', attendeeInfos.region);
    formData.append('isIrlAttendee', attendeeInfos.isIrlAttendee);

    if (attendeeInfos.virtualTourSatisfaction !== null) {
      formData.append('virtualTourSatisfaction', attendeeInfos.virtualTourSatisfaction);
    }
    if (attendeeInfos.websiteSatisfaction !== null) {
      formData.append('websiteSatisfaction', attendeeInfos.websiteSatisfaction);
    }

    return this.http.post<any>(this.baseApiUrl + 'registerAttendee', formData);
  }

  modifyAttendee(attendeeInfos: any) {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    const formData = new FormData();

    formData.append('id', attendeeInfos.id);
    formData.append('email', attendeeInfos.email);
    formData.append('firstName', attendeeInfos.firstName);
    formData.append('lastName', attendeeInfos.lastName);
    formData.append('diplomaId', attendeeInfos.diplomaId);
    formData.append('diplomaCategoryId', attendeeInfos.diplomaCategoryId)
    formData.append('regionalCode', attendeeInfos.regionalCode);
    formData.append('isIrlAttendee', attendeeInfos.isIrlAttendee);

    return this.http.post<any>(this.baseApiUrl + 'modifyAttendee', formData, { headers });
  }

  deleteAttendee(attendeeId: number) {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    const formData = new FormData();

    formData.append('attendeeId', attendeeId.toString());

    return this.http.post<any>(this.baseApiUrl + 'deleteAttendee', formData, { headers });
  }

  exportAttendeesList() {
    let headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    return this.http.get<any>(this.baseApiUrl + 'exportAttendees', { headers });
  }
}
