import { CommonService } from "@/app/core/common.service";
import { Component , OnInit } from '@angular/core';
import { NavigationEnd , Router } from "@angular/router";
import { filter , Observable , subscribeOn } from "rxjs";
import {UpperCase} from '@/app/core/utils'
interface Routers {
  id: number
  type: number
  url: string
  urlAfterRedirects: string,
  title:string
}
@Component({
  selector   : 'app-layout' ,
  templateUrl: './layout.component.html' ,
  styleUrls  : ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false
  routerList : any | undefined
  index = 0;
  tabs=[] as Routers[] | [] ;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {

    this.index = this.tabs.length - 1;
  }
  constructor(private CommonService : CommonService,private router:Router) {
    this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe((router:any)=>{
      console.log(router)
      const baseUrl=router.url.split('/')[1]
      const title=router.url.split('/')[2]
      console.log(baseUrl,title)

      const index=this.tabs.findIndex(item=>item.url===router.url)
      if(index!==-1){
        return
      }
      //@ts-ignore
      this.tabs.push({url:router.url,title})


    })
  }

  async ngOnInit()  {
    console.log('layout init')

    const res:any = await this.CommonService.getRouters()
//    const baseRouter=this.router.config

    console.log(res,this.router)
//    this.router.resetConfig(res.data)
    this.routerList=res.data

  }

}
