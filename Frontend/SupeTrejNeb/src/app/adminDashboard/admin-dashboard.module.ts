import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import {MainDashboardComponent} from "./components/mainDashboard/mainDashboard.component";
import { BreadcumsComponent } from './utils/breadcums/breadcums.component';
// import { MzSidenavModule } from 'ng2-materialize'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminDashboardRoutingModule,
    // MzSidenavModule
  ],
  declarations: [
    MainDashboardComponent,
    BreadcumsComponent
  ],

  exports:[
    AdminDashboardRoutingModule,
    BreadcumsComponent,

  ]
})
export class AdminDashboardModule { }