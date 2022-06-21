import { Http_client } from "@/app/net/http_client";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DictDataService {
  baseUrl = '/system/dict/data'

  constructor(private http : Http_client) {
  }

  // 新增字典
  public addDict(data : any) {
    return this.http.post(this.baseUrl ,
      data
    )
  }

  // 删除字典
  public delDict(dictId : string) {
    return this.http.delete(`${this.baseUrl}/${dictId}`)
  }

  // 修改字典
  public updateDict(data : any) {
    return this.http.put(this.baseUrl ,
      data
    )
  }

  // 查询字典列表
  public listDict(query : any) {
    return this.http.get(`${this.baseUrl}/list` ,
      query
    )
  }

  // 查询字典列表（排除节点）
  public listDictExcludeChild(dictId : string) {
    return this.http.get(`${this.baseUrl}/list/exclude/${dictId}`)
  }

  // 查询字典详细
  public getDict(dictId : string) {
    return this.http.get(`${this.baseUrl}/type/${dictId}`)
  }

  // 查询字典下拉树结构
  public treeSelect() {
    return this.http.get(`${this.baseUrl}/treeselect`)
  }

  // 根据角色ID查询字典树结构
  public roleDictTreeSelect(roleId : string) {
    return this.http.get(`${this.baseUrl}/roleDictTreeselect/${roleId}`)
  }


}
