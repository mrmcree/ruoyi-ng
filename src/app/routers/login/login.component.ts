import { Http_client } from "@/app/net/http_client";
import { AuthService } from "@/app/routers/auth.service";
import { HttpClient } from "@angular/common/http";

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  /**
   * 验证码
   * @type {string}
   */
  codeImage=''
  uuid=''
  constructor(private fb: FormBuilder,private http: Http_client,private router:Router) { }

  ngOnInit(): void {


    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      code:[null, [Validators.required]],
      remember: [true],
    });
  }
  ngAfterViewInit(){
    this.http.get('/captchaImage').subscribe ((response:any)=>{
      this.codeImage="data:image/gif;base64,"+response.img
      this.uuid=response.uuid
    })
  }
  submitForm(): void {

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.http.post('/login',{
        ...this.validateForm.value,
        uuid:this.uuid
      }).subscribe((response:any)=>{
        AuthService.setToken(response.token)
        this.router.navigateByUrl('/dashboard/index')
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
