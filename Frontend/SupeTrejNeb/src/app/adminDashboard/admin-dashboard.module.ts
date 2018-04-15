import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";
import { AdminDashboardRoutingModule} from "./admin-dashboard-routing.module";
import {MainDashboardComponent} from "./components/mainDashboard/mainDashboard.component";
import { BreadcumsComponent } from './utils/breadcums/breadcums.component';
import { CategoryComponent } from './components/category/category.component';
import { TableComponent } from './utils/table/table.component';
import { MzTooltipModule, MzSelectModule} from "ng2-materialize";
import { ProductComponent } from './components/product/product.component';
import { ProviderComponent } from './components/provider/provider.component';


// import { MzTabModule } from 'ng2-materialize' SE HA COMENTADO PORQUE NO SE USA AUNQUE SI QUEREMOS INCLUIR OTRO HABRA QUE IMPORTARLO AQUI E INFORMARLO EN IMPORTS

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AdminDashboardRoutingModule,
    MzTooltipModule,
    MzSelectModule

  ],
  declarations: [
    MainDashboardComponent,
    BreadcumsComponent,
    CategoryComponent,
    TableComponent,
    ProductComponent,
    ProviderComponent
  ],

  exports:[
    AdminDashboardRoutingModule,
    BreadcumsComponent

  ]
})
export class AdminDashboardModule { }
