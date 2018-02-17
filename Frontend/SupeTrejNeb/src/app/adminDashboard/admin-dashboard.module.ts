import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import {PruebaComponent} from "./components/prueba/prueba.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminDashboardRoutingModule
  ],
  declarations: [
    PruebaComponent
  ],

  exports:[
    AdminDashboardRoutingModule
  ]
})
export class AdminDashboardModule { }
