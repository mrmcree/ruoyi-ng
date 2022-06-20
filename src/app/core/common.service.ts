import { Http_client } from "@/app/net/http_client";
import { Injectable  } from '@angular/core';
import { Observable , Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private  userInfo : any
  private  role : any
  private  permissions : any
  private  routers:any
  private  sub= new Subject()
  constructor(private http : Http_client) {

  }

  setInfo() {
    this.getInfo().subscribe((response : any) => {
      const { roles , permissions , user } = response
      this.userInfo = user
      this.role = roles
      this.permissions = permissions
    })
  }

  getInfo() {
    return this.http.get('/getInfo')
  }
  getRouters(){
    return this.http.get('/getRouters')
  }
  setRouters(){
    this.getRouters().subscribe((res:any)=>{
     this.routers=res.data
      this.sub.next(res.data)
    })
  }
  get RouterInfo():Observable<any>{
    return this.sub.asObservable()
  }
}
