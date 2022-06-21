import { RoleComponent } from "@/app/routers/system/role/role.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component'


const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo:'user' ,},
  { path: 'user', component: UserComponent ,data:{breadcrumb:'user'}},
  { path: 'role', component: RoleComponent ,data:{breadcrumb:'user'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}