import { Component } from '@angular/core';
import {Users} from "../../classes/users";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {FormBuilder, NgForm} from "@angular/forms";
import {catchError, Observable, throwError} from "rxjs";
import {Pet} from "../table/pet.model";
import {Router} from "@angular/router";
import {PetService} from "../../services/pet.service";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //user: Users = new Users();

  constructor
  (
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,

  ) { }

  ngOnInit() {
  }


  user = {
    username: '',
    password: ''
  };

  // authenticate(user: Users): Observable<HttpResponse<any>> {
  //   const url = '/login';
  //   return this.http.post(url, user, { observe: 'response' });
  // }
  //

  onSubmit(loginform: NgForm) {


    const url = '/login';
    //user: Users = loginform.value;


    console.log('[login] data sent:');
    console.log(this.user);


    this.loginService.authenticate(this.user).subscribe(
      (token: string) => {
        console.log('[login] auth token:', token);

        localStorage.setItem('authToken', token);

        this.router.navigateByUrl('/table');
      },
      (error) => {
        console.log('[login] error:', error);
      }
    );



    // this.loginService.authenticate(this.user).subscribe(
    //   (response: HttpResponse<any>) => {
    //     console.log('[login] backend response:', response);
    //
    //     console.log(response.headers);
    //
    //     const authToken = response.headers.get('Authorization');
    //     console.log('[login] auth token:', authToken);
    //
    //     if (typeof authToken === "string") {
    //       localStorage.setItem('authToken', authToken);
    //     }
    //
    //     this.router.navigateByUrl('/table');
    //   },
    //   (error) => {
    //     console.log('[login] error:', error);
    //   }
    // );


    //
    // this.loginService.authenticate(this.user).subscribe(
    //   (response) => {
    //     console.log('[login] backend response:', response);
    //
    //     const authToken = response.headers.get('Authorization');
    //     console.log('[login] auth token:', authToken);
    //
    //     if (typeof authToken === "string") {
    //       localStorage.setItem('authToken', authToken);
    //     }
    //
    //     this.router.navigateByUrl('/table');
    //   },
    //   (error) => {
    //     console.log('[login] error:', error);
    //   }
    // );






    // console.log();
    // this.loginService.authenticate(this.user).subscribe(
    //   (response) => {
    //
    //     console.log('[login] backend response:', response);
    //
    //     const authToken = response.headers.get('Authorization');
    //
    //     localStorage.setItem('authToken', authToken);
    //
    //     this.router.navigateByUrl('/table');
    //   }
    // );




    // this.loginService.authenticate(this.user).pipe(
    //   catchError(error => {
    //     // Handle the error here, for example:
    //     console.error('[login] Error logging in:', error);
    //     return throwError(error);
    //   })
    // ).subscribe((response ) => {
    //   console.log('[login] backend response:');
    //
    //   //const authToken = response.headers.get('Bearer');
    //
    //   localStorage.setItem('authToken', response);
    //
    //
    //   console.log(response);
    //   this.router.navigateByUrl('/table')
    // });
  }
}
