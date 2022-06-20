

import { ExceptionRoutingModule } from "@/app/routers/exception/exception-routing.module";
import { ExceptionComponent } from "@/app/routers/exception/exception.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzResultModule} from "ng-zorro-antd/result";
import {NzButtonModule} from "ng-zorro-antd/button";

const COMPONENTS = [ExceptionComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ExceptionRoutingModule,
    NzResultModule,
    NzButtonModule
  ]
})
export class ExceptionModule { }
