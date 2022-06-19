import { NotFoundComponent } from "@/app/routers/exception/404.component";
import { NetErrorComponent } from "@/app/routers/exception/500.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [

  { path: 'notFound', component: NotFoundComponent },
  { path: 'netError', component: NetErrorComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule {}
