import { ModuleWithProviders} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

//TODO componentes routing
import { LoginComponent } from './components/auth/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AdminGuard} from "./guard/admin.guard";
import {RecoverUserComponent} from "./components/auth/recover-user/recover-user.component";
import {NewPasswordComponent} from "./components/auth/new-password/new-password.component";

const appRoutes : Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full',canActivate: [AdminGuard]},
  {path: '', redirectTo : 'dashboard', pathMatch: 'full',canActivate: [AdminGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'recover-user', component:RecoverUserComponent},
  {path: 'new-password', component:NewPasswordComponent},
  {path: 'dashboard', component: DashboardComponent , canActivate: [AdminGuard]},
  {path: '**', component: LoginComponent}



];

export const  appRoutingProviders: any[] = [];
export const  routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
