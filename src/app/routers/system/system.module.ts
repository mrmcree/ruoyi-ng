
import { SystemRoutingModule } from "@/app/routers/system/system-routing.module";
import { UserComponent } from "@/app/routers/system/user/user.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzTreeModule } from "ng-zorro-antd/tree";
import { NzTreeViewModule } from "ng-zorro-antd/tree-view";

const COMPONENTS = [UserComponent];


@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule ,
    SystemRoutingModule ,
    NzTreeViewModule ,
    NzIconModule ,
    NzInputModule ,
    NzTreeModule ,
    FormsModule
  ]
})
export class SystemModule { }
