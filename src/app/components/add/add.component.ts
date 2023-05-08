import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {PetType} from "./PetType.model";
import {FurColor} from "./FurColor.model";
import {CountryOfOrigin} from "./CountryOfOrigin.model";
import {PetService} from "../../services/pet.service";
import {Route, Router} from "@angular/router";
import {PetClass} from "../../classes/pet-class";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Pet} from "../table/pet.model";
import {catchError, throwError} from "rxjs";
import {LoginService} from "../../services/login.service";


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})


export class AddComponent {

  constructor(
    private http: HttpClient,
    private petService: PetService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  pet: PetClass = new PetClass();
  petTypes: PetType[] = [];
  colors: FurColor[] = [];
  countries: CountryOfOrigin[] = [];

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/types').subscribe(data => {
      this.petTypes = data;})
    this.http.get<any[]>('http://localhost:8080/api/colors').subscribe(data => {
      this.colors = data;});
    this.http.get<any[]>('http://localhost:8080/api/countries').subscribe(data => {
      this.countries = data;});


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

    // this.petService.addPet(pet).pipe(
    //   catchError(error => {
    //
    //
    //     console.error('[add] Error adding pet:', error);
    //     alert('[add] Error adding pet: ' + error.message);
    //     return throwError(error);
    //   })
    // ).subscribe((response: Pet[]) => {
    //   console.log('[add] data written to db:');
    //   console.log(response);
    //   this.router.navigateByUrl('/table')
    // });



  }



  // if (addForm.valid) {
  //   alert('Wrong, change it');
  //   return;
  // }
  // this.petService.addPet(pet).subscribe
  // ((response: Pet[]) => {
  //     console.log('data written to db:');
  //     console.log(response);
  //
  //   }
  // );

  //
  // public addFormGroup = this.formBuilder.group({
  //   name:['', Validators.required],
  //   code:['', Validators.required],
  //   type:['', Validators.required],
  //   furColor:['', Validators.required],
  //   countryOfOrigin:['', Validators.required]
  // });

  // public addFormGroup: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(1)])
  // });

  // public onSubmit(addForm: NgForm): void
  // {
  //   this.petService.addPet((addForm.value).subscribe
  //   (
  //     (response: Pet) =>
  //     {
  //       console.log(response);
  //     },
  //     (error: HttpErrorResponse) =>
  //     {
  //       alert(error.message);
  //     }
  //   ))
  // }

  //,
  //       (error: HttpErrorResponse) => {
  //         alert(error.message);
  //       }

  // public onSubmit(addForm: NgForm): void {
  //   const pet: Pet = addForm.value;
  //   this.petService.addPet(pet).subscribe(
  //     (response: Pet[]) => {
  //       console.log(response);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }

}
