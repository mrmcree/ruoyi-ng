

import { ExceptionRoutingModule } from "@/app/routers/exception/exception-routing.module";
import { ExceptionComponent } from "@/app/routers/exception/exception.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [ExceptionComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ExceptionRoutingModule
  ]
})
export class ExceptionModule { }
