import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PetType} from "./PetType.model";
import {FurColor} from "./FurColor.model";
import {CountryOfOrigin} from "./CountryOfOrigin.model";
import {PetService} from "../../services/pet.service";
import {Router} from "@angular/router";
import {PetClass} from "../../classes/pet-class";
import {FormBuilder, NgForm} from "@angular/forms";
import {Pet} from "../table/pet.model";
import {catchError, throwError} from "rxjs";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})


export class AddComponent {

  pet: PetClass = new PetClass();
  petTypes: PetType[] = [];
  colors: FurColor[] = [];
  countries: CountryOfOrigin[] = [];

  constructor(
    private http: HttpClient,
    private petService: PetService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/types').subscribe(data => {
      this.petTypes = data;
    })
    this.http.get<any[]>('http://localhost:8080/api/colors').subscribe(data => {
      this.colors = data;
    });
    this.http.get<any[]>('http://localhost:8080/api/countries').subscribe(data => {
      this.countries = data;
    });


  }


  public onSubmit(addForm: NgForm): void {

    const pet: Pet = addForm.value;
    const username: string = this.loginService.getAuthToken();


    console.log('[add] data sent:');
    console.log(pet);

    this.petService.addPet(pet, username).pipe(
      catchError(error => {
        console.error('[add] Error adding pet:', error);
        alert('[add] Error adding pet: ' + error.message);
        return throwError(error);
      })
    ).subscribe((response: Pet[]) => {
      console.log('[add] data written to db:');
      console.log(response);
      this.router.navigateByUrl('/table')
    });


  }


}
