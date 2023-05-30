import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { CustomValidators } from 'src/app/helper/custom-validators';
import { response } from 'src/app/model/response';
import { tbl_login } from 'src/app/model/tbl-login';
import { LoginService } from 'src/app/helper/login.service';
import Swal from 'sweetalert2';
import { Base } from 'src/app/helper/base';
import { mst_states } from 'src/app/model/product-tracker';
import { tbl_company } from 'src/app/model/tbl-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  response!: response;
  fg_company: FormGroup = new FormGroup({});
  fg_user: FormGroup = new FormGroup({});
  submitted = false;
  pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  base: any;
  step: any = 1;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private toastr:ToastrService
  ) {
    this.base = Base;
    this.fg_company = formBuilder.group({
      // company_id:[''],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ['', [ Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),Validators.minLength(10)]],
      email: [ '',[  Validators.email, Validators.pattern(this.pattern),Validators.maxLength(100)]],
      address: [''],
      city: [''],
      state: [''],
      // status:[''],
      // photo:[''],
      // create_by:[''],
      // update_by:['']
    });



    this.fg_user = formBuilder.group(
      {
        name: ['',[Validators.required]],
        mobile: ['',[Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
        Validators.minLength(10),]],
        email: ['', [ Validators.email,Validators.pattern(this.pattern), Validators.maxLength(100)]],
        address: [''],
        city: [''],
        state: [''],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.base.PasswordValidator)]],
        // password: [ '',[Validators.required,
        //   Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
        otp: ['0'],
        source_app: ['web'],
        // user_id: ['0'],
        // company_id: ['0'],
        // salt: [''],
        // role_id: ['0'],
        // status: ['0'],
        // default_language_id: [''],
        // photo:[''],
        // create_by: ['0'],
        // update_by: ['0'],
      }
      // , {
      //   validator: CustomValidators('password', 'confirmPassword')
      // }
    );
  }
  ngOnInit(): void {}
  
  get onChanged() {
    return this.fg_company.controls;
  }
  get onChanged_fg_user() {
    return this.fg_user.controls;
  }
  onNextClick() {
    this.step = 2;
    var fg_company: tbl_company = this.fg_company.value;
    // alert(JSON.stringify(fg_company))
    sessionStorage.setItem('fg_company', JSON.stringify(fg_company));
  }

  onGetOTPClick() {
    try {
      var fg_user: tbl_login = this.fg_user.value;
      sessionStorage.setItem('fg_user', JSON.stringify(fg_user));
      this.loginService.onGetOTPClick(fg_user).subscribe((res: any) => {
        console.log(JSON.stringify(res));
        if (res.status == 'success') {
          this.toastr.success(res.message,'!Success');
          // alert("Your One time Password is: " + this.response.data)
          this.router.navigate(['/otp'], { queryParams: { p: 1 } });
        } else {
          this.toastr.error(res.message,'!Error');
          // alert(res.message);
          // console.warn(res.message)
        }
      });
    } catch (error: any) {
      throw error;
      alert(error.message);
    }
  }
  isMobileNumber(event: any) {
    const ch = event.which ? event.which : event.keyCode;
    if (ch > 31 && (ch < 48 || ch > 57)) {
      return false;
    }
    return true;
  }
  navigate() {
    this.router.navigateByUrl('/login');
  }
  routerpage() {
    this.router.navigate(['', { outlets: { lgn: 'login' } }]);
  }
  check_login() {
    if (localStorage.getItem('ltn')) {
      this.router.navigateByUrl('Services');
    } else {
      Swal.fire({
        text: 'Not logged in? Go to login page.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
      }).then((ltn: { isConfirmed: boolean }) => {
        if (ltn.isConfirmed == true) {
        }
      });
      this.router.navigateByUrl('Services');
    }
  }
}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

