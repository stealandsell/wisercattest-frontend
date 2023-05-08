import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {AuthResponse} from "../classes/auth-response";



@Injectable({
  providedIn: 'root'
})


export class LoginService {

  private baseUrl = 'http://localhost:8080';
  private readonly TOKEN_KEY = 'authToken';
  constructor(
    private http: HttpClient
  ) { }



  authenticate(user: any): Observable<string> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(`${this.baseUrl}/login`, user, { headers: headers, responseType: 'text' as 'json' });
  }

  getAuthToken():string {
    // @ts-ignore
    return localStorage.getItem('authToken')
  }


  // authenticate(user: any): Observable<HttpResponse<any>> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this.http.post(`${this.baseUrl}/login`, user, { headers: headers, observe: 'response' });
  // }

  // authenticate(user: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/login`, user);
  // }
}
