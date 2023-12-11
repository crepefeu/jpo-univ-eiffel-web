import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  signIn(loginData: any) {
    const formData = new FormData();

    formData.append('login', loginData.login);
    formData.append('password', loginData.password);

    return this.http.post<any>(this.baseApiUrl + 'signIn', formData);
  }

  verifyAuth() {
    let headers = { 'Authorization': localStorage.getItem('token') ?? '' };

    return this.http.get<any>(this.baseApiUrl + 'isAuth', { headers: headers });
  }

  signOut() {
    localStorage.removeItem('token');
  }
}
