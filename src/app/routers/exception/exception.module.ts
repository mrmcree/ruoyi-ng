
import { NotFoundComponent } from "@/app/routers/exception/404.component";
import { NetErrorComponent } from "@/app/routers/exception/500.component";
import { ExceptionRoutingModule } from "@/app/routers/exception/exception-routing.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const COMPONENTS = [NotFoundComponent,NetErrorComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ExceptionRoutingModule
  ]
})
export class ExceptionModule { }
