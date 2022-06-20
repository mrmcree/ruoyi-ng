import { CommonService } from "@/app/core/common.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed=false
  routerList:any
  constructor(private CommonService:CommonService) { }

  ngOnInit(): void {
  this.CommonService.RouterInfo.subscribe(res=>{
      console.log(res)
    this.routerList=res
    })
  }

}
