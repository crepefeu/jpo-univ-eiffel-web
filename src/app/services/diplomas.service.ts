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

  getAllDiplomaCategoriesWithDiplomas() {
    return this.httpClient.get<any>(this.baseApiUrl + 'getAllDiplomaCategoriesWithDiplomas')
  }

  addDiploma(diploma: any) {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };
    
    const formData = new FormData();

    formData.append('diplomaName', diploma.diplomaName);
    formData.append('diplomaCategoryId', diploma.diplomaCategoryId);

    return this.httpClient.post<any>(this.baseApiUrl + 'addDiploma', formData);
  }

  modifyDiploma(diploma: any) {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    const formData= new FormData();

    formData.append('id', diploma.id);
    formData.append('diplomaName', diploma.diplomaName);
    formData.append('diplomaCategoryId', diploma.diplomaCategoryId);

    return this.httpClient.post<any>(this.baseApiUrl + 'modifyDiploma', formData);
  }

  deleteDiploma(diplomaId: number) {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    const formData = new FormData();

    formData.append('diplomaId', diplomaId.toString());

    return this.httpClient.post<any>(this.baseApiUrl + 'deleteDiploma', formData);
  }

  addDiplomaCategory(diplomaCategory: any) {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    const formData = new FormData();

    formData.append('diplomaCategoryName', diplomaCategory.diplomaCategoryName);

    return this.httpClient.post<any>(this.baseApiUrl + 'addDiplomaCategory', formData);
  }

  modifyDiplomaCategory(diplomaCategory: any) {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    const formData = new FormData();

    formData.append('id', diplomaCategory.id);
    formData.append('diplomaCategoryName', diplomaCategory.diplomaCategoryName);

    return this.httpClient.post<any>(this.baseApiUrl + 'modifyDiplomaCategory', formData);
  }

  deleteDiplomaCategory(diplomaCategoryId: number) {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    const formData = new FormData();

    formData.append('diplomaCategoryId', diplomaCategoryId.toString());

    return this.httpClient.post<any>(this.baseApiUrl + 'deleteDiplomaCategory', formData, { headers });
  }
}
