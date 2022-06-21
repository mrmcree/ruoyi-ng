
import { DefaultInterceptor } from "@/app/net/default.interceptor";
import { LoginComponent } from "@/app/routers/login/login.component";
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from "src/app/layout/layout.module";

import { RouteRoutingModule } from './routers/routers-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { IconDefinition } from '@ant-design/icons-angular';
 import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


 const antDesignIcons = AllIcons as {
   [key: string]: IconDefinition;
 };
 const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent ,
    LoginComponent,



  ],
  imports: [
    BrowserModule ,
    HttpClientModule,
    NzIconModule.forRoot(icons) ,
    RouteRoutingModule,
    FormsModule ,
    NzNotificationModule,
    BrowserAnimationsModule ,
    SharedModule ,
    LayoutModule ,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {provide: HTTP_INTERCEPTORS,useClass: DefaultInterceptor, multi: true }
    ,
//    {
//      provide: APP_INITIALIZER,
//
//      useClass: RouteRoutingModule,
//      multi: true
//    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
