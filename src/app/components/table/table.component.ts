import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from './pet.model';
import {PetService} from "../../services/pet.service";
import {ActivatedRoute} from "@angular/router";
import {PetClass} from "../../classes/pet-class";
import {LoginService} from "../../services/login.service";
// import { Pet } from './pet'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})



export class TableComponent implements OnInit {

  //pets: Pet[]
  pets: Pet[] = [];
  pet: PetClass = new PetClass();

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }


  ngOnInit(): void {

    const username: string = this.loginService.getAuthToken();

    this.getPets(username);

  }

  private getPets(username: string){

    this.petService.getPetsList(username).subscribe(data => {
      this.pets = data;
    })
  }

  sortColumn(columnName: string) {
    const currentSortOrder = this.petService.currentSortOrder(columnName);
    const sortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';

    // Sort the pets array based on the column and sort order
    this.pets.sort((a, b) => {
      // @ts-ignore
      const valueA = a[columnName];
      // @ts-ignore
      const valueB = b[columnName];

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    // Update the current sort order of the column
    this.petService.setSortOrder(columnName, sortOrder);
  }
}


// ngOnInit() {
//   this.pets = [{
//     "id": 1,
//     "name": "wwwwwww",
//     "code": "44210",
//     "type": "852",
//     "fur_color": "5620",
//     "country_of_origin": "523652"
//   },
//     {
//       "id": 2,
//       "name": "wwwwwww",
//       "code": "44210",
//       "type": "852",
//       "fur_color": "5620",
//       "country_of_origin": "523652"
//     }
//
//   ]
// }
// updatePet(pet: Pet){
//   const id = this.route.snapshot.paramMap.get('id')!;
//   this.petService.getPetById(Number(id)).subscribe(pet => {
//     this.pet = pet;
//   });
// }
