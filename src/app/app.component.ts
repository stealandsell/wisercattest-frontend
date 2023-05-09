import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PetService} from "./services/pet.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Pet Management';

  constructor(
    private http: HttpClient,
    private petService: PetService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }


  logout() {

    localStorage.removeItem('authToken'); // Remove the user's authentication token
    this.router.navigate(['/login']); // Navigate to the login page
  }

}
