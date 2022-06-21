
import { SystemRoutingModule } from "@/app/routers/system/system-routing.module";
import { UserComponent } from "@/app/routers/system/user/user.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzWaveModule } from "ng-zorro-antd/core/wave";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTableModule } from "ng-zorro-antd/table";

import { NzTreeModule } from "ng-zorro-antd/tree";
import { NzTreeViewModule } from "ng-zorro-antd/tree-view";
import { RoleComponent } from './role/role.component';
import { DataComponent } from './dict/data/data.component';
import { TypeComponent } from './dict/type/type.component';

const COMPONENTS = [UserComponent];


@NgModule({
  declarations: [...COMPONENTS, RoleComponent, DataComponent, TypeComponent],
  imports: [

    CommonModule ,
    NzTreeViewModule ,
    NzIconModule ,
    NzInputModule ,
    NzTreeModule ,
    FormsModule ,
    NzFormModule ,
    ReactiveFormsModule ,
    NzWaveModule ,
    NzButtonModule ,
    NzSelectModule ,
    NzSelectModule ,
    SystemRoutingModule ,
    NzDatePickerModule ,
    NzTableModule ,
    NzDividerModule ,

  ]
})
export class SystemModule { }
