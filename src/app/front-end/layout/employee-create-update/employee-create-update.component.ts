import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { mst_states } from 'src/app/model/product-tracker';
import { Base } from 'src/app/helper/base';
import { ColumnMode } from '@swimlane/ngx-datatable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { tbl_login } from 'src/app/model/tbl-model';

@Component({
  selector: 'app-employee-create-update',
  templateUrl: './employee-create-update.component.html',
  styleUrls: ['./employee-create-update.component.css'],
})
export class EmployeeCreateUpdateComponent implements OnInit {
  login_form: FormGroup;
  tbl_login: tbl_login = new tbl_login();
  mst_states: mst_states[] = [];
  mst_role: any;
  tbl_roles: any;
  isDrawerOpen = false;
  @Output()
  base: any;
  filedata: any;
  password: any;
  UserDetail: any;
  submitted = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private baseServiceService: BaseServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.base = Base;
    this.UserDetail = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.password = this.generatePassword();
    this.login_form = this.formBuilder.group({
      name: ['', [Validators.required]],
      mobile: ['', [ Validators.required, Validators.maxLength(10),Validators.pattern(this.base.MobileValidator),]],
      email: ['',[  Validators.email, Validators.pattern(this.pattern),Validators.maxLength(100)]],
      city: [''],
      state: [''],
      role_id: ['', [Validators.required]],
      status: [''],
      user_id: [''],
      photo: [''],
      address: [''],
    });
  }
  generatePassword() {
    return Math.random().toString(36).slice(-8);
  }
  ngOnInit(): void {
    let user_id = null;
    this.route.queryParamMap.subscribe((params) => {
      user_id = params.get('user_id');
    });
    if (user_id == null) this.get_form_data(null);
    else this.get_form_data(user_id);
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get formcontrols() {
    return this.login_form.controls;
  }
  get_form_data(user_id?: any) {
    var api_url = '';
    if (user_id != null)
      api_url = `employee/form_data_get?entity_id=${user_id}`;
    else api_url = `employee/form_data_get`;
    this.baseServiceService.get(api_url).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.mst_role = res.data.vehicle_type;
          this.mst_states = res.data.states;
          if (user_id != null)
            this.login_form.patchValue(res.data.entity_data[0]);
        } else this.toastr.error(res.message, 'Error!');
      },
      (error) => {
        this.toastr.error(error.message, 'Error!');
        // this.toastr.error('Something went wrong, please try again!', 'Error!');
      } // error path
    );
  }
  onChange(files: any) {
    this.filedata = files.target.files[0];
    // if (["image/jpeg", "image/png", "image/jpg"].indexOf(this.filedata.type) === -1) {
    //   this.toastr.error('please select JPG OR PNG image.', 'Error!');
    //   return;
    // }
  }
  on_submit() {
    this.submitted = true;
    if (this.login_form.valid == true) {
      var formdata = new FormData();
      formdata.append('name', this.login_form.value.name);
      formdata.append('email', this.login_form.value.email);
      formdata.append('mobile', this.login_form.value.mobile);
      formdata.append('role_id', this.login_form.value.role_id);
      formdata.append('city', this.login_form.value.city);
      formdata.append('state', this.login_form.value.state);
      formdata.append('user_id', this.login_form.value.user_id);
      this.baseServiceService.post('employee', formdata).subscribe(
        (res: any) => {
          if (res.status == 'success') {
            this.toastr.success(res.message, 'Success!');
            debugger
            if (this.login_form.value.user_id !='')this.router.navigate(['/employees']);
            this.login_form.reset();           
          } else this.toastr.error(res.message, 'Error!');
        },
        (error) => {
          throw error;
        }
      );
    } else this.toastr.error('Please enter valid details', 'Error!');
  }
}
