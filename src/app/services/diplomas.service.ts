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

  getAllDiplomaCategories() {
    return this.httpClient.get<any>(this.baseApiUrl + 'getAllDiplomaCategories');
  }

  addDiploma(diploma: any) {
    const formData = new FormData();

    formData.append('diplomaName', diploma.diplomaName);
    formData.append('diplomaCategoryId', diploma.diplomaCategoryId);

    return this.httpClient.post<any>(this.baseApiUrl + 'addDiploma', formData);
  }

  deleteDiploma(diplomaId: number) {
    const formData = new FormData();

    formData.append('diplomaId', diplomaId.toString());
    
    return this.httpClient.post<any>(this.baseApiUrl + 'deleteDiploma', formData);
  }
}
