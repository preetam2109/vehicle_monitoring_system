import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GetRestaurantByIdService } from 'src/app/helper/get-restaurant-by-id.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { change_password_data, get_otp_profile } from 'src/app/model/kot-model.model';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'src/app/model/response';
import { LoginService } from 'src/app/helper/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// import { tbl_account_delete } from 'src/app/model/tbl-model';
import { ConfirmPasswordValidator } from 'src/app/helper/custom-validators';
import { Base } from 'src/app/helper/base';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isDrawerOpen: boolean=false;
  @Output()
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tbl_account_delete: tbl_account_delete = new tbl_account_delete();
  user_delete_form: FormGroup;
  changePasswordForm: FormGroup;
  form_change_mobile: FormGroup;
  form_change_email: FormGroup;
  // vriable=true;
  submitted = false;
  display_verify_otp = 'none';
  is_edit_mobile = false;
  result: any;
  base: any;
  value: any;
  fileName = '';
  disableTextbox = false;
  otp_data!: number;
  regular_expression = ("^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$");
  rexp_for_mobile = ("^((\\+91-?)|0)?[0-9]{10}$");
  rexp_for_email = ("^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$");
  regular_expression1 = ("^([0-9]{10})$");
  verify_otp_data: get_otp_profile = new get_otp_profile();
  loginData: change_password_data = new change_password_data();


  constructor(private toastr: ToastrService,
    private _GetRestaurantByIdService: GetRestaurantByIdService, private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal) {
    
      this.base = Base;
    this.changePasswordForm = this.formBuilder.group({
      mobile_Number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.rexp_for_mobile)]],
      email: ['', [Validators.required, Validators.pattern(this.rexp_for_email)]],

      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8),
      Validators.pattern(this.base.PasswordValidator)]],
      Confirm_password: ['', [Validators.required]],
      otp1: ['', [Validators.required]],
      otp2: ['', [Validators.required]],
      otp3: ['', [Validators.required]],
      otp4: ['', [Validators.required]],
      otp5: ['', [Validators.required]],
      otp6: ['', [Validators.required]]
    }, {
      validator: ConfirmPasswordValidator('new_password', 'Confirm_password')
    }
    )
    this.form_change_mobile = this.formBuilder.group({
      mobile_Number: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(this.rexp_for_mobile)]],
    })
    this.form_change_email = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })
    this.user_delete_form = this.formBuilder.group({
      delete_remark: [''],
      Password: ['', [Validators.required]],

    })

  }

  ngOnInit(): void {
  
    this.profile_get()
  }

  //   profile_data = new FormGroup({
  //     Mobile_Number:new FormControl("",[Validators.required]),
  //     Email:new FormControl("",[Validators.required])

  //  }); 
  open_mobile_modal(type: number, modalDefault_modal: any) {
    this.modalService.open(modalDefault_modal, {
      centered: true
    });
    if (type == 1) this.is_edit_mobile = true;

    else this.is_edit_mobile = false
  }
  profile_get() {
    try{
    var temp = this.changePasswordForm.value;
    this._GetRestaurantByIdService.profile_get().subscribe((res: any) => {
          // alert(JSON.stringify(res))
      if (res.status === 'success') {
        this.result = res.data[0];
      
      }else this.toastr.error(res.message);
    },(ex:any)=>{
      // alert(JSON.stringify(ex));
      this.toastr.error(JSON.stringify(ex));
    }
    );
  }catch(ex:any){
    throw ex; this.toastr.error(ex.message)
  }
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  change_password() {
    this.submitted = true;
    var changeFormData = this.changePasswordForm.value;
    this.loginData.email = this.result.mobile;
    // this.loginData.email = this.result.email;
    this.loginData.user_id = this.result.user_id;
    this.loginData.old_password = changeFormData.old_password;
    this.loginData.password = changeFormData.new_password;
    this.loginData.confirm_password = changeFormData.Confirm_password;

    this._GetRestaurantByIdService.change_password(this.loginData).subscribe((res: any) => {
      if (res.status === 'success') {
        this.toastr.success(res.message);

        localStorage.removeItem('currentUser');
        localStorage.removeItem('tbl_order');
        localStorage.removeItem('tbl_order_items');
        localStorage.removeItem('newOrderNumber');
        localStorage.removeItem('ltn');
        this.router.navigateByUrl('login');

      }
      else {
        this.toastr.error(res.message, 'Error!');

      }
    });
  }

  fileChangeEvent(e: any) {
    var filedata = e.target.files[0];
    if (["image/jpeg", "image/png", "image/jpg"].indexOf(filedata.type) === -1) {
      this.toastr.error('please select JPG OR PNG image.', 'Error!');
      return;
    }
    if (filedata) {
      var file = new FormData();
      file.append("thumbnail", filedata);
      try {
        this._GetRestaurantByIdService.change_profile(file).subscribe((res: response) => {
          // alert(JSON.stringify(res))
          if (res.status === 'success') {
            this.result.photo = res.data;
            this.toastr.success(res.message);
          }else this.toastr.error(res.message+'Error!');
        }
        // ,(error) => { this.toastr.error(JSON.stringify(error) +'Error!'); } 
        );}
      catch (ex) {
        throw ex;
        alert(ex)
      }
    }else this.toastr.error('Invalid data!', 'Error!');
  }

  onReset(): void {
    this.submitted = false;
    this.changePasswordForm.reset();
  }

  get_otp(modalDefault: any) {
    this.submitted = true;

    //var changeFormData = this.form_change_email.value;

    if (!this.is_edit_mobile) {
      if (this.form_change_email.invalid) {
        for (const control of Object.keys(this.form_change_email.controls)) {
          this.form_change_email.controls[control].markAsTouched();
        }
        return;
      }
      this.loginData.email = this.form_change_email.value.email;
      this.loginData.otP_for = '5';
    } else {
      if (this.form_change_mobile.invalid) {
        for (const control of Object.keys(this.form_change_mobile.controls)) {
          this.form_change_mobile.controls[control].markAsTouched();
        }
        return;
      }
      this.loginData.email = this.form_change_mobile.value.mobile_Number;
      this.loginData.otP_for = '4';
    }

    // if(this.loginData.email==""){this.showModalBox =false ;return;}
    this._GetRestaurantByIdService.get_otp(this.loginData).subscribe((res: any) => {
      console.log(JSON.stringify(res))
      if (res.status === 'success') {
        // this.showModalBox = true;
        sessionStorage.setItem("tbl_login", JSON.stringify(this.loginData))
        // alert('your OTP is:' + res.data)        //data:123456
        this.modalService.open(modalDefault, {
          centered: true
        });

        // this.router.navigate(['/otp'],{ queryParams: { p: queryParamValue } });
      } else {
        this.toastr.error(res.message);
        // alert("Please Check userId and password")
      }
    }, (error) => { alert(JSON.stringify(error)) }
    );

    // }
  }
  // isOTP2(event: any) {
  //   // debugger
  //   console.warn(event.target.value)
  //   const ch = (event.which) ? event.which : event.keyCode;
  //   if (ch > 31 && (ch < 48 || ch > 57)) {
  //     return false;
  //   }
  //   return true;
  // }

  isOTP(previous_input: any, event: any, nextInput: any, input_position: any) {
    var inputvalue = event.target.value.trim();
    if (isNaN(inputvalue)) return true;
    if (inputvalue != '' && input_position < 6) {
      nextInput.focus();
    }
    else if (inputvalue == '' && input_position > 1) {
      previous_input.focus();
    }
    return false;
  }


  // isOTP(previous_input:any, event: any,nextInput:any, input_position:any) {


  // const ch = (event.which) ? event.which : event.keyCode;
  // if (ch > 31 && (ch < 48 || ch > 57)) {
  //   return false;
  // }
  //  if(event.target.value != ''){
  //   nextInput.focus();

  //  }
  //  else{
  //   previous_input.focus();

  //  }

  //   // console.warn(event.target.value)


  //   // // var nextInput = inputs.get(inputs.index(document.activeElement) + 1);

  //   // var nextInput = document.getElementById(event.target.id);
  //   // if (nextInput) {
  //   //   let input = event.target.id;

  //   //   let newID = input + nextInput;
  //   //   // document.getElementById(newID).focus();
  //   //   newID.focus();
  //   // }


  //   return true;
  // }

  otpValidate(modalDefault: any) {
    var otp: any;
    otp = this.changePasswordForm.value;
    otp = '' + otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 + otp.otp5 + otp.otp6
    var data = JSON.parse(sessionStorage.getItem("tbl_login") || '{}');
    this.otp_data = otp;
    console.warn(this.otp_data);
    this.verify_otp_data = data;
    this.verify_otp_data.otp = otp;
    this.verify_otp_data.user_id = this.result.user_id;

    // this.verify_otp_data.email=this.result.mobile;
    // this.verify_otp_data.email=this.result.email;
    // this.verify_otp_data.otP_for = '4';
    // verify_otp
    this._GetRestaurantByIdService.verify_otp(this.verify_otp_data).subscribe((res: any) => {
      console.log("res:" + JSON.stringify(res.data));
      if (res.status === 'success') {
        this.profile_get()
        this.modalService.dismissAll(modalDefault)

        // this.modalService.dismissAll(modalDefault {
        //   centered: true
        // });
        // console.log("res:" + JSON.stringify(res.data));


        this.toastr.success(res.message, "success!");
      } else {
        this.toastr.error(res.message, "error!");
      }
    });


  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }

  get delete_user() { return this.user_delete_form.controls; }
  user_delete_account() {
    // try {
    //   this.submitted = true;
    //   if (this.user_delete_form.valid == true) {
    //     this.tbl_account_delete = this.user_delete_form.value;
    //     this.loginService.user_delete_account(this.tbl_account_delete).subscribe((res: any) => {
    //       if (res.status === 'Success') {
    //         localStorage.removeItem('currentUser');
    //         localStorage.removeItem('tbl_order');
    //         localStorage.removeItem('tbl_order_items');
    //         localStorage.removeItem('ltn');
    //         localStorage.removeItem("return_url");
    //         this.toastr.success(res.message, 'Success!');

    //         this.router.navigateByUrl('/Service');
    //       }
    //       else {
    //         this.toastr.error(res.message, 'Error!');

    //       }

    //     }, (ex: any) => {

    //       this.toastr.error(ex.Message, 'Error!');

    //     });
    //   } else { this.toastr.error("Please enter required data to delete account.", 'Error!'); }
    // } catch (er: any) {
    //   throw er;
    //   this.toastr.error("Please enter required data to delete account.", 'Error!');
    // }

  }
}

