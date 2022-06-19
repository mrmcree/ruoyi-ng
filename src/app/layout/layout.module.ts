import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { SHARED_ZORRO_MODULES } from "src/app/shared/shared-zorro.module";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule ,
    SHARED_ZORRO_MODULES ,
    NzLayoutModule ,
    RouterModule,
    NzIconModule
  ],
  exports: [SHARED_ZORRO_MODULES , LayoutComponent]
})
export class LayoutModule { }
