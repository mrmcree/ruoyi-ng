import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router,CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//class UserToken {}
//class Permissions {
//  canActivate(user: UserToken, id: string): boolean {
//    return true;
//  }
//}
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor() {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//    console.log(ActivatedRoute)
//    // 基本权限控制流程
//    // 1. 获取route 的data或者参数paramMap数据
//    const permissionList = route.data.permission;
//    // 2. 通过自己实现的权限服务判断返回相应的结果
//    const canActivate = (permissionList as string[]).includes('admin');
//    return canActivate;\

    return  true
//    return this.permissions.canActivate(this.currentUser, '1');
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
