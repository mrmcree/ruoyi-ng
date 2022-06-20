import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

type EnumExceptionType = 'success' | 'error' | 'info' | 'warning'| '404' | '403' | '500'

@Component({
  selector: 'app-exception',
  template: `
    <nz-result [nzStatus]="type" [nzTitle]="type" [nzSubTitle]="subTile[type] ">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="back()">Back Home</button>
      </div>
    </nz-result>
  `
})

export class ExceptionComponent implements OnInit {
 public subTile :{ [key: string]: string }= {
   '404': '页面不存在',
   '403': '没有权限',
   '500': '服务器错误'
 }

  constructor(private route: ActivatedRoute,private router:Router) { }
  get type(): EnumExceptionType {
    return String(this.route.snapshot.data['type']).toLowerCase() as EnumExceptionType
  }
  back(){
    this.router.navigateByUrl('/dashboard/index')
  }
  ngOnInit(): void {
  }

}
