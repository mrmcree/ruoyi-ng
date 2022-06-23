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

  async ngOnInit()  {
    console.log('layout init')

    const res:any = await this.CommonService.getRouters()
    this.routerList=res.data
  }

}
