import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { ConfirmPasswordValidator } from 'src/app/helper/custom-validators';
import { LoginService } from 'src/app/helper/login.service';
import { model_authentication } from 'src/app/model/model-authentication';
import { response } from 'src/app/model/response';
import { tbl_login, tbl_varifyied_response } from 'src/app/model/tbl-login';

@Component({
  selector: 'app-reset-check-password',
  templateUrl: './reset-check-password.component.html',
  styleUrls: ['./reset-check-password.component.css']
})
export class ResetCheckPasswordComponent implements OnInit {
  base:any;
  checkPasswordForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,
    private activatedRoute: ActivatedRoute,private toastr:ToastrService) {
      this.base=Base;
    this.checkPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.pattern(this.base.PasswordValidator)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmPasswordValidator('password', 'confirm_password')
    });
  }

  ngOnInit(): void {
this.loginData=JSON.parse(sessionStorage.getItem("tbl_login") || '{}');

  }
  loginData: model_authentication = new model_authentication();
  checkPassword() {
    try{
    this.submitted = true;
    var resetFormData = this.checkPasswordForm.value;
    if (this.checkPasswordForm.valid == true) {
    this.loginData.password = resetFormData.password;
    this.loginData.confirm_password = resetFormData.confirm_password;
    // console.log(JSON.stringify(this.loginData))
    this.loginService.reset_password(this.loginData).subscribe((res: any) => {
      if (res.status == 'success') {
        this.toastr.success(res.message,'!Success');   //data:123456
        this.router.navigate(['/login']);

      } else {
        this.toastr.error(res.message,'!Error');
      }
    }
    // ,(ex:any)=>{alert(JSON.stringify(ex))}
    );
  }else this.toastr.error('Invalid data!', 'Error!')
  }catch(ex:any){throw ex; }

  }

  get f() {
    return this.checkPasswordForm.controls;
  }

}
