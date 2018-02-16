import {ModuleWithProviders, NgModule} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

//TODO componentes routing
import { LoginComponent } from './components/auth/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminGuard} from "./guard/admin.guard";
import {TerminalBlockGuard} from "./guard/terminal-block.guard";
import {RecoverUserComponent} from "./components/auth/recover-user/recover-user.component";
import {NewPasswordComponent} from "./components/auth/new-password/new-password.component";
import {PageBlockComponent} from "./components/auth/page-block/page-block.component";
import {PruebaComponent} from "./components/prueba/prueba.component";



const appRoutes : Routes = [
  {path: 'page-block', component: PageBlockComponent},
  {path: '', component: DashboardComponent, pathMatch: 'full',canActivate: [TerminalBlockGuard,AdminGuard]},
  {path: '', redirectTo : 'dashboard', pathMatch: 'full',canActivate: [TerminalBlockGuard, AdminGuard]},
  {path: 'login', component: LoginComponent, canActivate: [TerminalBlockGuard]},
  {path: 'recover-user', component:RecoverUserComponent, canActivate: [TerminalBlockGuard]},
  {path: 'new-password', component:NewPasswordComponent, canActivate: [TerminalBlockGuard]},
  {path: 'dashboard', component: DashboardComponent , canActivate: [TerminalBlockGuard, AdminGuard],  children: [
      {path: '', redirectTo: 'prueba', pathMatch: 'full'},
    {path: 'prueba', component: PruebaComponent}

    ]},
  {path: '**', component: LoginComponent, canActivate: [TerminalBlockGuard]}

];


export const  appRoutingProviders: any[] = [];
export const  routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
