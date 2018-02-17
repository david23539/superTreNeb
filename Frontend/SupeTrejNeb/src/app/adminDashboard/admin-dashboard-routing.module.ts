import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminGuard} from "../guard/admin.guard";
import {TerminalBlockGuard} from "../guard/terminal-block.guard";
import {PruebaComponent} from "./components/prueba/prueba.component";


const adminDashboardRouter: Routes = [
  {path: 'dashboard', component: DashboardComponent , canActivate: [TerminalBlockGuard, AdminGuard],  children: [
      {path: '', redirectTo: 'prueba', pathMatch: 'full'},
      {path: 'prueba', component: PruebaComponent}

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
