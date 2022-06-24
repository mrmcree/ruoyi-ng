import { DeptService } from "@/app/routers/system/dept/dept.service";
import { DictDataService } from "@/app/routers/system/dict/data/dict.data.service";
import { UserDialogComponent } from "@/app/routers/system/user/user.dialog";
import { UserService } from "@/app/routers/system/user/user.service";
import { HttpHeaders } from "@angular/common/http";
import { Component , OnInit , AfterViewInit , ViewChild } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from "@angular/forms";
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { resolveTree } from '@/app/core/utils'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {Dict} from '@/app/core/interface'
export interface Data {
  userId : number;
  userName : string;
  nickName : number;
  deptName : string;
  phonenumber : string;
  dept:any;
  status : boolean;
  createTime : boolean;
  disabled : boolean;
}


@Component({
  selector   : 'app-user' ,
  templateUrl: './user.component.html' ,
  styleUrls  : ['./user.component.scss']
})
export class UserComponent implements AfterViewInit , OnInit {
  @ViewChild('UserDialog')
  private  UserDialog!:UserDialogComponent
  isCollapse=true
  /**
   * 部门搜索关键词
   * @type {string}
   */
  searchValue = '';
  /**
   * @description 筛选表单
   * @type {FormGroup}
   */
  queryParams! : FormGroup;
  /**
   * @description 多选是否
   * @type {boolean}
   */
  checked = false
  /**
   * @description 表格加载
   * @type {boolean}
   */
  loading = false;
  indeterminate = false;
  /**
   * @description 状态字典
   * @type {dict[]}
   */
  sys_normal_disable : Dict[] = [];
  /**
   * @description 性别字典
   * @type {Array<{value : string, text : string}>}
   */
  sys_user_sex : Dict[] = []
  /**
   * 部门树
   * @type {any[]}
   */
  nodes = [];
  /**
   * 用户表格数据
   * @type {readonly Data[]}
   */
  userList : readonly Data[] = [];
  listOfCurrentPageData : readonly Data[] = [];
  setOfCheckedId = new Set<number>();
  /* 搜索参数 */
  searchParams = {
    pageSize : 10 ,
    pageIndex: 1 ,
    deptId   : 0
  }

  /* 多选方法 */
  listOfSelection = [
    {
      text    : '全选' ,
      onSelect: () => {
        this.onAllChecked(true);
      }
    } ,
    {
      text    : '选中偶数行' ,
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data , index) => this.updateCheckedSet(data.userId , index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    } ,
    {
      text    : '选中奇数行' ,
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data , index) => this.updateCheckedSet(data.userId , index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }


  ];
  /**
   * @description 弹框显示
   * @type {boolean}
   */
  detailDialogVisible = false

  async ngOnInit() {
    this.queryParams = this.fb.group({
      userName   : [null] ,
      phonenumber: [null] ,
      status     : [null] ,
      dateRange  : [null , null] ,
    });
    await this.getTreeSelect()
    const res : any = await this.DictService.getDict('sys_normal_disable')
    this.sys_normal_disable = res.data
    const res2 : any = this.DictService.getDict('sys_user_sex')
    this.sys_user_sex = res2.data

  }

  ngAfterViewInit() : void {
  }
  reloadTable(): void {
    this.message.info('刷新成功')
    this.getList();
  }
  toggleCollapse(){
    this.isCollapse=!this.isCollapse
  }
  /**
   * 部门树选择
   * @param {NzFormatEmitEvent} event
   */
  nzEvent(event : NzFormatEmitEvent) : void {

    if ( event.eventName !== 'click' ) {
      return;
    }
    const keys = event.keys
    this.searchParams.deptId = Number(keys?.[0])
    this.getList()

  }

  constructor(private message : NzMessageService , private fb : FormBuilder , private userService : UserService , private DeptService : DeptService , private DictService : DictDataService) {
  }

  /**
   * 添加选中的数据状态
   * @param {number} userId
   * @param {boolean} checked
   */
  updateCheckedSet(userId : number , checked : boolean) : void {
    if ( checked ) {
      this.setOfCheckedId.add(userId);
    }
    else {
      this.setOfCheckedId.delete(userId);
    }
  }

  /**
   * 更新选中的数据状态
   */
  refreshCheckedStatus() : void {
    const listOfEnabledData = this.userList.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ userId }) => this.setOfCheckedId.has(userId));
    this.indeterminate = listOfEnabledData.some(({ userId }) => this.setOfCheckedId.has(userId)) && !this.checked;
  }

  /**
   * @description 多选方法
   * @param {boolean} checked
   */
  onAllChecked(checked : boolean) : void {
    this.userList
        .filter(({ disabled }) => !disabled)
        .forEach(({ userId }) => this.updateCheckedSet(userId , checked));
    this.refreshCheckedStatus();
  }


  onCurrentPageDataChange(listOfCurrentPageData : readonly Data[]) : void {
    console.log(listOfCurrentPageData)
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  async getList(params? : NzTableQueryParams)  {

    this.loading = true
    const res:any = await this.userService.listUser({ ...this.searchParams , ...this.queryParams.value }).finally(()=>this.loading=false)
    this.userList = res.rows
  }

  async getTreeSelect() {
    const res:any= await this.DeptService.treeSelect()
    //@ts-ignore
    this.nodes = (resolveTree(res.data))
  }

  /**
   * 子项选中
   * @param {number} userId
   * @param {boolean} checked
   */
  onItemChecked(userId : number , checked : boolean) : void {
    this.updateCheckedSet(userId , checked);
    this.refreshCheckedStatus();
  }

  /**
   * @description 搜索
   */
  handleQuery() {
    this.getList()
  }

  /**
   * @description 重置
   */
  resetForm() {
    this.queryParams.reset()
  }

  /**
   * @description 删除
   * @param data
   */
  async handleDelete(data ? : any) {
//    console.log(data)
    await this.userService.delUser(data.id)
    this.message.success('删除成功')
    this.getList()
  }

  /**
   * @description 添加
   */
  handleAdd() {
   this.UserDialog.handleAdd()
  }
  /**
   * @description 导入
   */
  handleImport(){

  }
  /**
   * @description 导出
   */
  handleExport(){

  }
  /**
   * @description 编辑
   */
  handleEdit(userId : number){
    this.UserDialog.handleEdit(userId)
  }
}
