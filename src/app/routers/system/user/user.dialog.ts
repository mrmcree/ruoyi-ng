import { response } from "@/app/core/interface";
import { AuthService } from "@/app/routers/auth.service";
import { UserService } from "@/app/routers/system/user/user.service";
import { Component , EventEmitter , OnInit , Input , Output } from '@angular/core';
import { FormBuilder , FormControl , FormGroup , Validators } from "@angular/forms";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector : 'app-userDialog' ,
  template : `
    <nz-modal
      [(nzVisible)]="isVisible"
      [nzTitle]="ModelTitle"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
      [nzOkLoading]="isOkLoading"
    >
      <form nz-form *nzModalContent [formGroup]="form" [nzLayout]="'inline'" (ngSubmit)="save()" class="form-wrap">
        <div nz-row class="w-full flex " [nzGutter]="20">

          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label nzRequired [nzSpan]="8">用户昵称</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="Input is required">
                <input nz-input formControlName="nickName" id="nickName" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">归属部门</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="MaxLength is 6">
                <input nz-input formControlName="deptId" name="deptId"  />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row class="w-full flex " [nzGutter]="20">

          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">手机号码</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="Input is required">
                <input nz-input formControlName="phonenumber" id="phonenumber" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">邮箱</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="MaxLength is 6">
                <input nz-input formControlName="email" name="email"  />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row class="w-full flex " [nzGutter]="20" *ngIf="form.value.id!=null">

          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label nzRequired [nzSpan]="8">用户名称</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="Input is required">
                <input nz-input formControlName="userName" id="userName" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label nzRequired [nzSpan]="8">用户密码</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="MaxLength is 6">
                <input nz-input formControlName="password" name="password"  />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row class="w-full flex " [nzGutter]="20">

          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">用户性别</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="Input is required">
                <input nz-input formControlName="sex" id="sex" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">状态</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="MaxLength is 6">
                <input nz-input formControlName="status" name="status"  />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row class="w-full flex " [nzGutter]="20">

          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">岗位</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="Input is required">
                <input nz-input formControlName="postIds" id="postIds" />
              </nz-form-control>
            </nz-form-item>
          </div>
          <div nz-col [nzSpan]="12">
            <nz-form-item>
              <nz-form-label [nzSpan]="8">角色</nz-form-label>
              <nz-form-control [nzSpan]="18" nzErrorTip="MaxLength is 6">
                <input nz-input formControlName="roleIds" name="roleIds"  />
              </nz-form-control>
            </nz-form-item>
          </div>
        </div>
        <div nz-row class="w-full flex " [nzGutter]="20">

          <div nz-col [nzSpan]="24">
            <nz-form-item class="w-full">
              <nz-form-label [nzSpan]="6">备注</nz-form-label>
              <nz-form-control [nzSpan]="20" nzErrorTip="Input is required">
                <textarea nz-input formControlName="remark" id="remark"></textarea>
              </nz-form-control>
            </nz-form-item>
          </div>

        </div>

      </form>

    </nz-modal>
  ` ,
  styleUrls: ['./user.component.scss']
})
export class UserDialogComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  ModelTitle = ''
  form! : FormGroup;
  @Output() SaveSuccess = new EventEmitter<boolean>();

  constructor(private fb : FormBuilder , private UserService : UserService , private message : NzMessageService) {
  }

  ngOnInit() : void {
    this.form = this.fb.group({
      userId         : [] ,
      nickName   : [null , Validators.required] ,
      deptId     : [null] ,
      phonenumber: [null] ,
      email      : [null , null] ,
      userName   : [null , Validators.required] ,
      password   : [null , Validators.required] ,
      sex        : [] ,
      status     : [] ,
      postIds    : [] ,
      roleIds    : [] ,
      remark     : [] ,
    });
  }

  showModal() : void {

    this.isVisible = true;
  }

  handleAdd() {
    this.ModelTitle = '添加用户'
    this.isVisible = true;
    this.form.reset()
  }

  async handleEdit(userId : number) {
    this.ModelTitle = '编辑用户'
    this.isVisible = true;
    this.form.reset()

    const res : any = await this.UserService.getUser(userId)
    this.form.patchValue(res.data)
//    this.form.setControl('password' , new FormControl(null))
  }

  async handleOk() {

    if ( this.form.valid ) {
      this.isOkLoading = true;

      if(this.form.value.userId==null){
        await this.UserService.addUser(this.form.value).finally(() => this.isOkLoading = false)
        this.message.success('添加成功')
      }else {
        await this.UserService.updateUser(this.form.value).finally(() => this.isOkLoading = false)
        this.message.success('更新成功')
      }


      this.SaveSuccess.emit(true)
      this.handleCancel()


    }
    else {
      Object.values(this.form.controls).forEach(control => {
        if ( control.invalid ) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }

  }

  handleCancel() : void {
    this.isVisible = false;
  }

  save() {
    console.log(this.form.value)
  }


}
