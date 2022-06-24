import { CommonService } from "@/app/core/common.service";
import { Component , OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector   : 'app-layout' ,
  templateUrl: './layout.component.html' ,
  styleUrls  : ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false
  routerList : any | undefined

  constructor(private CommonService : CommonService,private router:Router) {
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
