import { Http_client } from "@/app/net/http_client";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DictTypeService {
  baseUrl = '/system/dict/type'

  constructor(private http : Http_client) {
  }

  // 新增字典类型
  public addType(data : any) {
    return this.http.post(this.baseUrl ,
      data
    )
  }

  // 删除字典类型
  public delType(dictId : string) {
    return this.http.delete(`${this.baseUrl}/${dictId}`)
  }

  // 修改字典类型
  public updateType(data : any) {
    return this.http.put(this.baseUrl ,
      data
    )
  }

  // 查询字典类型列表
  public listType(query : any) {
    return this.http.get(`${this.baseUrl}/list` ,
      query
    )
  }

  // 查询字典类型详细
  public getType(dictId : string) {
    return this.http.get(`${this.baseUrl}/${dictId}`)
  }

  // 刷新字典缓存
  public refreshCache() {
    return this.http.delete(`${this.baseUrl}/refreshCache`)
  }
  // 获取字典选择框列表
  public optionSelect() {
    return this.http.get(`${this.baseUrl}/optionselect`)
  }
}
