import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/helper/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { response } from 'src/app/model/response';
import { tbl_login } from 'src/app/model/tbl-login';
import { model_authentication } from 'src/app/model/model-authentication';
import { Base } from 'src/app/helper/base';
import { ToastrService } from 'ngx-toastr';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/filter';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  base:any;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,private toastr:ToastrService,
    private activatedRoute: ActivatedRoute) {
    this.base=Base;
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(this.base.MobileValidator)]]
    })
  }

  ngOnInit(): void {

    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params);
    // });
    console.log(this.activatedRoute.snapshot.queryParamMap.get('p'));
    const queryParamValue = Number(this.activatedRoute.snapshot.queryParamMap.get('p'));
    console.log(queryParamValue);


  }
  loginData: model_authentication = new model_authentication();
  resetPassword() {
    try{
    this.submitted = true;
    var resetFormData = this.resetPasswordForm.value;
    this.loginData.email = resetFormData.email;
    this.loginData.otP_for = '3';
    const queryParamValue = Number(this.activatedRoute.snapshot.queryParamMap.get('p'));
    // console.log(JSON.stringify(this.loginData));
    this.loginService.get_otp(this.loginData).subscribe((res: any) => {
      console.log(JSON.stringify(res))        //data:123456
      if (res.status == 'success') {
        this.toastr.success(res.message,'!Success');
        sessionStorage.setItem("tbl_login",JSON.stringify(this.loginData))
        // this.router.navigate(['otp'], { queryParams: { p: queryParamValue } });
        this.router.navigate(['/otp'], { queryParams: { p: queryParamValue } });
      } else {
        this.toastr.error(res.message);
        // alert("Please Check userId and password")
        // this.toastr.error("User id or password is incorrect! Please Try again")
      }
    }
    // ,(ex:any)=>{
    //   throw ex;
    //   alert(JSON.stringify(ex));
    // }
    );
  }catch(ex:any){
    throw ex;
        alert(ex.message)
  }

  }

  get f() {
    return this.resetPasswordForm.controls;
  }

}
