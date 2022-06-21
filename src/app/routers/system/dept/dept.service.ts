import { Http_client } from "@/app/net/http_client";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DeptService {
  baseUrl = '/system/dept'

  constructor(private http : Http_client) {
  }

  // 新增部门
  public addDept(data : any) {
    return this.http.post(this.baseUrl ,
      data
    )
  }

  // 删除部门
  public delDept(deptId : string) {
    return this.http.delete(`${this.baseUrl}/${deptId}`)
  }

  // 修改部门
  public updateDept(data : any) {
    return this.http.put(this.baseUrl ,
      data
    )
  }

  // 查询部门列表
  public listDept(query : any) {
    return this.http.get(`${this.baseUrl}/list` ,
      query
      )
  }

  // 查询部门列表（排除节点）
  public listDeptExcludeChild(deptId : string) {
    return this.http.get(`${this.baseUrl}/list/exclude/${deptId}`)
  }

  // 查询部门详细
  public getDept(deptId : string) {
    return this.http.get(`${this.baseUrl}/${deptId}`)
  }

  // 查询部门下拉树结构
  public treeSelect() {
    return this.http.get(`${this.baseUrl}/treeselect`)
  }

  // 根据角色ID查询部门树结构
  public roleDeptTreeSelect(roleId : string) {
    return this.http.get(`${this.baseUrl}/roleDeptTreeselect/${roleId}`)
  }


}
