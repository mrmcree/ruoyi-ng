import { AuthGuard } from "@/app/routers/auth.guard";

import { LoginComponent } from "@/app/routers/login/login.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// layout
import { LayoutComponent } from '../layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard],
    data: {
      // 路由数据根据自己业务配置
      permission: ['admin']
    },

    children: [
      { path: '',  pathMatch: 'full',redirectTo:'/dashboard' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { preload: true }
      },

    ],

  },
  {
    path:'login',
    component:LoginComponent
  },
  { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
  { path: '**', redirectTo: 'exception/404' }


//  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes, {

      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top',

    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
