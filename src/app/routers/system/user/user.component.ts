import { DeptService } from "@/app/routers/system/dept/dept.service";
import { DictDataService } from "@/app/routers/system/dict/data/dict.data.service";
import { UserService } from "@/app/routers/system/user/user.service";
import { Component , OnInit , AfterViewInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from "@angular/forms";
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { resolveTree } from '@/app/core/utils'
export interface Data {
  userId: string;
  userName: string;
  nickName: number;
  deptName: string;
  phonenumber: string;
  status: boolean;
  createTime: boolean;
  id:number,
  disabled: boolean;
}

@Component({
  selector   : 'app-user' ,
  templateUrl: './user.component.html' ,
  styleUrls  : ['./user.component.scss']
})
export class UserComponent implements AfterViewInit , OnInit {
  searchValue = '';
  queryParams! : FormGroup;

//  queryParams={
//    pageSize:1,
//    pageNum:10,
//
//  }
  checked=false
  loading = false;
  indeterminate = false;
  sys_normal_disable :Array<{ value: string; text: string }> = [];
  sys_user_sex:Array<{ value: string; text: string }>= [];
  nodes = [];
  userList=[]
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  nzEvent(event : NzFormatEmitEvent) : void {
    console.log(event);
  }

  constructor(private fb : FormBuilder , private userService : UserService , private DeptService : DeptService , private DictService : DictDataService) {
  }
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.userList.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onAllChecked(checked: boolean): void {
    this.userList
        .filter(({ disabled }) => !disabled)
        .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }
  ngOnInit() {
    this.queryParams = this.fb.group({
      userName   : [null , [Validators.required]] ,
      phonenumber: [null , [Validators.required]] ,
      status     : [null , [Validators.required]] ,
      dateRange  : [null , [Validators.required]] ,
    });
    this.getTreeSelect()
    this.DictService.getDict('sys_normal_disable').subscribe((res:any) => {
      this.sys_normal_disable = res.data
    })
    this.DictService.getDict('sys_user_sex').subscribe((res:any) => {
      this.sys_user_sex = res.data
    })
    this.getList()
  }

  ngAfterViewInit() : void {


  }


  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }
  getList(){
    this.userService.listUser({}).subscribe((res:any)=>{
      this.listOfData=res.rows
    })
  }
  getTreeSelect() {
    this.DeptService.treeSelect().subscribe((res : any) => {

      //@ts-ignore
      this.nodes = (resolveTree(res.data))
      console.log(this.nodes)
    })
  }
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }
  handleQuery() {
    console.log(this.queryParams.value)
  }

  resetForm() {

  }

}
