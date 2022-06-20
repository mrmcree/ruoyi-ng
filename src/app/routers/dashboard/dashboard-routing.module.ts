import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component'


const routes: Routes = [
  { path: '', pathMatch: 'full',redirectTo:'index' ,},
  { path: 'index', component: IndexComponent ,data:{breadcrumb:'index'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
