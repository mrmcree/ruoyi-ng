import { Http_client } from "@/app/net/http_client";
import { Injectable } from '@angular/core';
import { Observable , Subject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public userInfo : any
  private role : any
  private permissions : any
//  private routers : any
//  private sub = new Subject()

  constructor(private http : Http_client) {

  }

  async setInfo() {
    const response : any = await this.getInfo()
    const { roles , permissions , user } = response
    this.userInfo = user
    this.role = roles
    this.permissions = permissions
  }

  getInfo() {
    return this.http.get('/getInfo')
  }

  getRouters() {
    return this.http.get('/getRouters')
  }



}
