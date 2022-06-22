import { DashboardRoutingModule } from "@/app/routers/dashboard/dashboard-routing.module";
import { IndexComponent } from "@/app/routers/dashboard/index/index.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [IndexComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class MonitorModule { }
