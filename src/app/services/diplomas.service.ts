import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DiplomasService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllDiplomas() {
    return this.httpClient.get<any>(this.baseApiUrl + 'getAllDiplomas');
  }
}
