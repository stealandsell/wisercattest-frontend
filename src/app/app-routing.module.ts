import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { TableComponent } from './components/table/table.component';
import {EditComponent} from "./components/edit/edit.component";
import {LoginService} from "./services/login.service";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [

  // {path: '', component: HomeComponent},
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  {path: 'add', component: AddComponent},
  {path: 'table', component: TableComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
