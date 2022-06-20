
import { SystemRoutingModule } from "@/app/routers/system/system-routing.module";
import { UserComponent } from "@/app/routers/system/user/user.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [UserComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
