import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  private baseUrl = 'http://localhost:8080';
  private readonly TOKEN_KEY = 'authToken';

  constructor(
    private http: HttpClient
  ) {
  }


  authenticate(user: any): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(`${this.baseUrl}/login`, user, {headers: headers, responseType: 'text' as 'json'});
  }

  getAuthToken(): string {
    // @ts-ignore
    return localStorage.getItem('authToken')
  }

}
