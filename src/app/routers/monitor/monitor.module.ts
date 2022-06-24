import { DashboardRoutingModule } from "@/app/routers/dashboard/dashboard-routing.module";

import { CacheComponent } from "@/app/routers/monitor/cache/cache.component";
import { DruidComponent } from "@/app/routers/monitor/druid/druid.component";
import { JobComponent } from "@/app/routers/monitor/job/job.component";
import { LogininforComponent } from "@/app/routers/monitor/logininfor/logininfor.component";
import { OnlineComponent } from "@/app/routers/monitor/online/online.component";
import { OnpenlogComponent } from "@/app/routers/monitor/onpenlog/onpenlog.component";
import { ServerComponent } from "@/app/routers/monitor/server/server.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [CacheComponent,DruidComponent,JobComponent,LogininforComponent,OnlineComponent,OnpenlogComponent,ServerComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class MonitorModule { }
