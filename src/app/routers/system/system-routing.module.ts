import { ConfigComponent } from "@/app/routers/system/config/config.component";
import { DataComponent } from "@/app/routers/system/dict/data/data.component";
import { TypeComponent } from "@/app/routers/system/dict/type/type.component";
import { RoleComponent } from "@/app/routers/system/role/role.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component'


const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo:'user' ,},
  { path: 'user', component: UserComponent ,data:{
      title: '用户管理',
      key: 'set-user',

      breadcrumb:'user',keep:true
  }},
  { path: 'role', component: RoleComponent ,data:{
      title: '角色管理',
      key: 'set-role',

    breadcrumb:'role',keep:true}},
  { path: 'config', component: ConfigComponent ,data:{breadcrumb:'config'}},
  { path: 'dict/data', component:DataComponent ,data:{breadcrumb:'data'}},
  { path: 'dict/type', component:TypeComponent ,data:{breadcrumb:'type'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
