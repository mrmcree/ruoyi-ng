import { Token } from "@angular/compiler";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static TokenKey = 'Admin-Token'
  constructor() {

  }
  static getToken(){
    return localStorage.getItem(this.TokenKey)
  }
  static setToken(token:string){
    return localStorage.setItem(this.TokenKey,token)
  }
  static removeToken(){
    return localStorage.removeItem(this.TokenKey)
  }
}
