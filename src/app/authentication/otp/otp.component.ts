import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/helper/login.service';
import { model_authentication } from 'src/app/model/model-authentication';
import { response } from 'src/app/model/response';
import { Location } from '@angular/common';
import {
  tbl_company,
  tbl_login,
  tbl_validateotp,
} from 'src/app/model/tbl-login';
import { md_company_reg } from 'src/app/model/tbl-model';

export interface tbl_otp_response {
  status: string;
  token: string;
  expiration: Date;
  aame: string;
  phto: string;
}

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  response!: response;
  otpForm: FormGroup;
  otp_data!: number;
  verify_otp_data: model_authentication = new model_authentication();

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService, private toastr:ToastrService, private location: Location

  ) {
    this.otpForm = this.formBuilder.group({
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]],
    });
  }

  isOTP(previous_input:any, event: any,nextInput:any, input_position:any) {
    var inputvalue = event.target.value.trim();
    if(isNaN(inputvalue) )return true;
     if(inputvalue != '' && input_position < 6){
      nextInput.focus();
     }
     else if(inputvalue == '' && input_position > 1){
      previous_input.focus();
     }
      return false;
    }


    // isOTP(previous_input:any, event: any,nextInput:any, input_position:any,input:any) {
    //   var inputvalue = event.target.value.trim();

    //   // const keyValue = +event.key;
    //   // const numberOnlyPattern = '[0-9]+';
    //   // const newValue = input.value + (isNaN(keyValue) ? '' : keyValue.toString());
    //   // const match = newValue.match(numberOnlyPattern);


    //   // if (+newValue > 1 || !match || newValue === '') {
    //   //   event.preventDefault();
    //   //  }

    //   if(isNaN(inputvalue) )return true;
    //    if(inputvalue != '' && input_position < 6){
    //     nextInput.focus();
    //    }
    //    else if(inputvalue == '' && input_position > 1){
    //     previous_input.focus();
    //    } 

     
    //     return false;
    //   }

    
  ngOnInit(): void {}

  cancel() {
    this.router.navigateByUrl('/restaurant');
  }
  otpValidate() {
    try {
      var otp: any;
      otp = this.otpForm.value;
      otp = '' + otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6;
      var data = JSON.parse(sessionStorage.getItem('tbl_login') || '{}');
      this.otp_data = otp;
      this.verify_otp_data = data;
      this.verify_otp_data.otp = otp;
      if (this.otp_data) {
        var loginData: tbl_login = data;
        const queryParamvalue =
          this.activatedRoute.snapshot.queryParamMap.get('p');
        // this.router.navigateByUrl('/reset-check-password');

        switch (queryParamvalue) {
          case '1': {
            var fg_company: tbl_company = JSON.parse(
              sessionStorage.getItem('fg_company') || '{}'
            );
            var fg_user: tbl_login = JSON.parse(
              sessionStorage.getItem('fg_user') || '{}'
            );
            fg_user.otp = this.otp_data;
            // var reg_data = {'tbl_company': fg_company, 'tbl_login': fg_user};
            var md: md_company_reg = new md_company_reg();
            md.tbl_company = fg_company;
            md.tbl_login = fg_user;
            // console.warn('MD ::::::',JSON.stringify(md));
            this.loginService.otpValidate(md).subscribe(
              (res: any) => {
                var response = res;
                if (response) {
                  localStorage.setItem("ltn", JSON.stringify(res.token));
                  localStorage.setItem("currentUser", JSON.stringify(res));
                  this.toastr.success(res.message, '!Success')
                  // alert('Your Registration is successfully and you are logged in');
                  this.router.navigateByUrl('/home');
                } else {
                  this.toastr.error(res.message, '!Error');
                  // alert('Internal Server Error Please try again..');
                }
              }, (err: any) => { this.toastr.error(JSON.stringify(err)); });
            ; break;
          }
          // case '2': {
          //   this.loginService.otpValidate(this.otp_data, loginData).subscribe((res: any) => {
          //     var response = res;
          //     if (response) {
          //       localStorage.setItem("ltn", JSON.stringify(response.token))
          //       alert("Your Registration is successfully and you are logged in")
          //       this.router.navigateByUrl("/home")
          //     } else {
          //       alert("Internal Server Error Please try again..")
          //     }
          //   }); break;
          // }
          case '3': {
            try{
            this.loginService.verify_otp(this.verify_otp_data).subscribe((res: any) => {
              if (res.status == 'success') {
                this.router.navigateByUrl("/reset-check-password")
              } else {
                this.toastr.error(res.message, '!Error');
                // alert("Internal Server Error Please try again..")
              }
            }
            // , (ex: any) => {
            //   this.toastr.error('Please input valid OTP', '!Error');
            //   // this.toastr.error(JSON.stringify(ex));
            //   // throw ex;
            // }
            );
            break;
          }catch(ex:any){throw ex; this.toastr.error(ex.message)}
          }
          // default: {
          //   statements;
          //   this.loginService.otpValidate(this.otp_data, loginData).subscribe((res: any) => {
          //     var response = res;
          //     if (response) {
          //       localStorage.setItem("ltn", JSON.stringify(response.token))
          //       localStorage.setItem("curentUser", JSON.stringify(res));
          //       alert("Your Registration is successfully and you are loggedIn")
          //       this.router.navigate(['kot'])
          //     } else {
          //       alert("Internal Server Error Please try again..")
          //     }
          //   });
          //   break;
          // }
        }
      } else {
        this.toastr.error('Please input valid OTP', '!Error');
      }
    } catch (ex: any) {
      throw ex;
    }
  }

  // closePopup() {
  //   this.router.navigate(['', { outlets: { lgn: 'user-registration' } }])
  // }
back(){this.location.back();}
  
}
