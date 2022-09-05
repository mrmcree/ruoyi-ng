import { Http_client } from "@/app/net/http_client";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { NgHttpCachingHeaders } from "@/app/net/cache.service";


@Injectable({
  providedIn: 'root'
})
//基础请求类 crud
export class BaseService {
  protected readonly baseUrl : string;


  constructor(protected http : Http_client, baseUrl = '') {
    this.baseUrl = baseUrl
  }
  // 新增
  public insert(data : any) {
    return this.http.post(this.baseUrl ,
      data
    )
  }
  // 删除
  public delete(ids : string) {
    return this.http.delete(`${this.baseUrl}/${ids}`)
  }

  // 修改
  public update(data : any) {
    return this.http.put(this.baseUrl ,
      data
    )
  }
  // 查询列表
  public getList(query : any,options?:object) {
    return this.http.get(`${this.baseUrl}/list` ,
      query,
    )
  }

  // 查询用户详细
  public getDetail(id : number) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  // 导出
  public export(id : number) {
    return this.http.get(`${this.baseUrl}/export`)
  }
}
