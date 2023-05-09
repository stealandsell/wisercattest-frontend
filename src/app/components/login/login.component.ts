import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //user: Users = new Users();

  user = {
    username: '',
    password: ''
  };

  constructor
  (
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
  }

  ngOnInit() {
  }

  onSubmit(loginform: NgForm) {


    const url = '/login';


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


  }
}
