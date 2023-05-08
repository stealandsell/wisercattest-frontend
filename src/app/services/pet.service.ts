import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pet} from "../components/table/pet.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {


  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) { }

  public getPetsList(): Observable<Pet[]>{
    return this.httpClient.get<Pet[]>(`${this.baseURL}/api/pets`) ;
  }


  addPet(pet: Pet, username: string): Observable<Pet[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('username', username)
    };
    return this.httpClient.post<Pet[]>(this.baseURL + '/add', pet, httpOptions);
  }

  // public addPet(pet: Pet): Observable<Pet[]>{
  //   return this.httpClient.post<Pet[]>(`${this.baseURL}/add`, pet);
  // }

  public getPetById(id: number): Observable<Pet> {
    const url = `${this.baseURL}/edit/${id}`;
    console.log('sent url:')
    console.log(url)
    return this.httpClient.get<Pet>(url);
  }

  public updatePet(id: number, updatedPet: Pet): Observable<Pet> {
    const url = `${this.baseURL}/edit/${id}`;
    return this.httpClient.put<Pet>(url, updatedPet);
  }

  private sortOrders: {[key: string]: string} = {};


  currentSortOrder(columnName: string): 'asc' | 'desc' | null {
    const sortOrder = this.sortOrders[columnName];
    if (sortOrder === "asc" || sortOrder === "desc") {
      return sortOrder;
    } else {
      return null;
    }
  }

  setSortOrder(columnName: string, sortOrder: 'asc' | 'desc') {
    this.sortOrders[columnName] = sortOrder;
  }


}
