import { Http_client } from "@/app/net/http_client";
import { HttpClient } from "@angular/common/http";

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
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
  constructor(private fb: FormBuilder,private http: Http_client) { }

  ngOnInit(): void {


    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      code:[null, [Validators.required]],
      remember: [true],
    });
  }
  ngAfterViewInit(){
    this.http.get('/captchaImage').subscribe ((response:any)=>{
      this.codeImage="data:image/gif;base64,"+response.img
    })
  }
  submitForm(): void {

    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
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
