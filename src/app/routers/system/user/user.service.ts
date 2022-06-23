import { Http_client } from "@/app/net/http_client";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { NgHttpCachingHeaders } from "@/app/net/cache.service";
export interface User {
  userId : string,
}

export interface UserPwd extends User {
  password : string
}

export interface UserStatus extends User {
  status : string
}
export interface ListParams{
  pageSize:number,
  pageNum:number
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '/system/user'

  constructor(private http : Http_client) {
  }

  // 查询用户列表
  public listUser(query : any,options?:object) {
    let cheaders = new HttpHeaders()
      .set(NgHttpCachingHeaders.ALLOW_CACHE,'true');
    return this.http.get(`${this.baseUrl}/list` ,
      query,cheaders
    )
  }

  // 查询用户详细
  public getUser(userId : string) {
    return this.http.get(`${this.baseUrl}/${userId}`)
  }

  // 新增用户
  public addUser(data : any) {
    return this.http.post(this.baseUrl ,
      data
    )
  }

  // 修改用户
  public updateUser(data : any) {
    return this.http.put(this.baseUrl ,
      data
    )
  }

  // 删除用户
  public delUser(userId : string) {
    return this.http.delete(`${this.baseUrl}/${userId}`)
  }

  // 用户密码重置
  public resetUserPwd(data : UserPwd) {
    return this.http.put(`${this.baseUrl}/resetPwd` ,
      data
    )
  }

  // 用户状态修改
  public changeUserStatus(data : UserStatus) {
    return this.http.put(`${this.baseUrl}/resetPwd` ,
      data
    )
  }

  //  查询用户个人信息
  public getUserProfile() {
    return this.http.get(`${this.baseUrl}/profile`)
  }

  // 修改用户个人信息
  public updateUserProfile(data : any) {
    return this.http.put(`${this.baseUrl}/profile` ,
      data
    )
  }

  // 用户密码重置
  public updateUserPwd(data : UserPwd) {
    return this.http.put(`${this.baseUrl}/profile/updatePwd` ,
      data
    )
  }

  // 用户头像上传
  public uploadAvatar(data : any) {
    return this.http.post(`${this.baseUrl}/profile/avatar` ,
      data
    )
  }

  // 查询授权角色
  public getAuthRole(userId : string) {
    return this.http.get(`${this.baseUrl}/authRole/${userId}`)
  }

  // 保存授权角色
  public updateAuthRole(data : any) {
    return this.http.put(`${this.baseUrl}/authRole` ,
      data
    )
  }
}
