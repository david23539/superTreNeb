import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders} from "./app.routing";
import { HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WaitLoadComponent } from './components/wait-load/wait-load.component';
import {AdminGuard} from "./guard/admin.guard";

import {LoginService} from "./services/service/login.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    WaitLoadComponent

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    AdminGuard,
    appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
