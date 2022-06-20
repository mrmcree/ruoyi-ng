import { CommonService } from "@/app/core/common.service";
import { Component , OnInit } from '@angular/core';

@Component({
  selector   : 'app-layout' ,
  templateUrl: './layout.component.html' ,
  styleUrls  : ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false
  routerList : any | undefined

  constructor(private CommonService : CommonService) {
  }

  ngOnInit() : void {
    console.log('layout init')
    this.CommonService.setRouters()
    this.CommonService.RouterInfo.subscribe((res:any) => {

      this.routerList = res
    })
  }

}
