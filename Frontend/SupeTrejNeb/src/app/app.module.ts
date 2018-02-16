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
import {TerminalBlockGuard} from "./guard/terminal-block.guard";
import {CheckBlockClientTerminalService} from "./services/service/check-block-client-terminal.service";
import {LoginService} from "./services/service/login.service";
import { RecoverUserComponent } from './components/auth/recover-user/recover-user.component';
import { NewPasswordComponent } from './components/auth/new-password/new-password.component';
import { PageBlockComponent } from './components/auth/page-block/page-block.component';
import { PruebaComponent } from './components/prueba/prueba.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    WaitLoadComponent,
    RecoverUserComponent,
    NewPasswordComponent,
    PageBlockComponent,
    PruebaComponent

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    CheckBlockClientTerminalService,
    AdminGuard,
    TerminalBlockGuard,
    appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
