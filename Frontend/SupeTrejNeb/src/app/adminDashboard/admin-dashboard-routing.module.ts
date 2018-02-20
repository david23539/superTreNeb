import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminGuard} from "../guard/admin.guard";
import {TerminalBlockGuard} from "../guard/terminal-block.guard";
import {MainDashboardComponent} from "./components/mainDashboard/mainDashboard.component";


const adminDashboardRouter: Routes = [
  {path: 'dashboard', component: DashboardComponent , canActivate: [TerminalBlockGuard, AdminGuard],  children: [
      {path: '', redirectTo: 'main-dashboard', pathMatch: 'full'},
      {path: 'main-dashboard', component: MainDashboardComponent}

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
