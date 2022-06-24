import { DashboardRoutingModule } from "@/app/routers/dashboard/dashboard-routing.module";
import { BuildComponent } from "@/app/routers/tool/build/build.component";
import { GenComponent } from "@/app/routers/tool/gen/gen.component";
import { SwaggerComponent } from "@/app/routers/tool/swagger/swagger.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [BuildComponent,GenComponent,SwaggerComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class ToolModule { }
