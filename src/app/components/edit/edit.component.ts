import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pet} from '../table/pet.model';
import {PetService} from '../../services/pet.service';
import {PetClass} from "../../classes/pet-class";
import {HttpClient} from "@angular/common/http";
import {PetType} from "../add/PetType.model";
import {FurColor} from "../add/FurColor.model";
import {CountryOfOrigin} from "../add/CountryOfOrigin.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  pet: PetClass = new PetClass();
  petTypes: PetType[] = [];
  colors: FurColor[] = [];
  countries: CountryOfOrigin[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {
  }


  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.petService.getPetById(Number(id)).subscribe(pet => {
      this.pet = pet;
    });


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


  onSubmit(editForm: NgForm) {

    const updatedPet: Pet = editForm.value;
    console.log('[edit] data sent:');
    console.log(updatedPet);

    const id = this.route.snapshot.paramMap.get('id')!;
    this.petService.getPetById(Number(id)).subscribe(pet => {
      this.pet = pet;
    });

    this.petService.updatePet(Number(id), updatedPet).subscribe(
      (response: Pet) => {
        console.log('[edit] data written to db:');
        console.log(response);
        this.router.navigateByUrl('/table');
      });


  }


}
