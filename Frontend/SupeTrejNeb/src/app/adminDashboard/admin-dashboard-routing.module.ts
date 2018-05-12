import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminGuard} from "../guard/admin.guard";
import {TerminalBlockGuard} from "../guard/terminal-block.guard";
import {MainDashboardComponent} from "./components/mainDashboard/mainDashboard.component";
import {CategoryComponent} from "./components/category/category.component";
import {ProductComponent} from "./components/product/product.component";
import {ProviderComponent} from "./components/provider/provider.component";
import {PersonsComponent} from "./components/persons/persons.component";
import {AddressComponent} from "./components/address/address.component";


const adminDashboardRouter: Routes = [
  {path: 'dashboard', component: DashboardComponent , canActivate: [TerminalBlockGuard, AdminGuard],  children: [
      {path: '', redirectTo: 'main-dashboard', pathMatch: 'full'},
      {path: 'main-dashboard', component: MainDashboardComponent},
      {path: 'category', component: CategoryComponent},
      {path: 'product', component: ProductComponent},
      {path: 'provider', component: ProviderComponent},
      {path: 'persons', component: PersonsComponent},
      {path: 'addresses', component: AddressComponent}


    ]},
];

@NgModule({
  imports: [
     RouterModule.forChild(adminDashboardRouter)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AdminDashboardRoutingModule { }
