import { ModuleWithProviders} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

//TODO componentes routing
import { LoginComponent } from './components/auth/login/login.component';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const appRoutes : Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: '', redirectTo : 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: LoginComponent},

 /* {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: '', redirectTo : 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'parques', component: ParquesComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'animals', component: AnimalsComponent},
  {path: 'keepers', component: KeepersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: 'get-animal/:id', component: AnimalDetailComponent},
  {path: '**', component: HomeComponent}*/

];

export const  appRoutingProviders: any[] = [];
export const  routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
