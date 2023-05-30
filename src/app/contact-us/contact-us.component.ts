import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MapsAPILoader } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
// import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
// import { tbl_contact_us } from '../model/sevagudi-model';
// import { LoginService } from '../helper/login.service';
// import { Base } from 'src/base';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Base } from '../helper/base';
import { LoginService } from '../helper/login.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // isDrawerOpen: boolean = false;
  // @Output()
  // drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  // current_role: any;
  // latitude: any;
  // longitude: any;
  // zoom: any;
  // address: any;
  // private geocoder: any;
  // filedata: any;
  // files: any;
  // form_group: UntypedFormGroup;
  // submitted: any;
  base: any;
  // error_msg!:string;
  // tbl_contact_us: tbl_contact_us = new tbl_contact_us();
  constructor(private location: Location,
    private mapsAPILoader: MapsAPILoader, private toastr: ToastrService,
    private formBuilder: FormBuilder, private _loginservice: LoginService, private router:Router) {
    this.base = Base;
    // this.form_group = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   mobile: ['', [Validators.required, Validators.pattern(this.base.MobileValidator), Validators.minLength(10)]],
    //   email: ['',[Validators.pattern(this.base.EmailValidator), Validators.minLength(10)]],
    //   message: ['', [Validators.required]],
    //   file: [''],
    // });
  }
  // ngOnInit(): void {
  //   // var currentUser_data = JSON.parse(localStorage.getItem("currentUser") || '{}');
  //   // this.current_role = currentUser_data.role;
  //   // // alert(this.current_role);
  //   // this.mapsAPILoader.load().then(() => {
  //   //   this.setCurrentLocation();
  //   // });
  // }

  // get form_controls() { return this.form_group.controls; }
  // private setCurrentLocation() {
  //   this.geocoder = new google.maps.Geocoder;
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       // alert(this.latitude );
  //       // alert(this.longitude);
  //       this.zoom = this.zoom + 0.5;
  //       this.zoom = 15;
  //       this.geocoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude } }, (results: any, status: any) => {
  //         if (status === 'OK') {
  //           if (results[0]) {

  //             // alert(this.address);
  //             this.zoom = this.zoom + 0.5;
  //             this.zoom = 15;
  //             this.address = results[0].formatted_address;
  //             // console.log(this.address);
  //           } else {
  //             this.toastr.error('No results found', 'Error!');
  //           }
  //         } else {
  //           this.toastr.error('Geocoder failed due to: ' + status);
  //         }
  //       });

  //     });
  //   }
  // }
  // fileChangeEvent(data: any) {
  //   var files_data = data.target.files[0];
  //   if (["image/png", "image/jpeg","application/pdf"].indexOf(files_data.type) === -1) {
  //   this.error_msg = 'You can upload only JPG, PNG or PDF file.'
  //   }else if (data.target.files.length > 0) {     
  //     this.error_msg = ' '
  //   }
  //   this.files = data.target.files[0].name;
   
  // }


  // contact_us_insert() {
  //   try {
  //     this.submitted = true;
  //     if (this.form_group.valid == true) {
  //       var formdata = new FormData();
  //       formdata.append("file", this.filedata);
  //       formdata.append("message", this.form_group.value.message);
  //       formdata.append("mobile", this.form_group.value.mobile);
  //       formdata.append("email", this.form_group.value.email);
  //       formdata.append("name", this.form_group.value.name);
  //       this._loginservice.contact_us_insert(formdata).subscribe((res: any) => {
  //         // alert(JSON.stringify(res));
  //         if (res.status === 'success') {
  //           this.toastr.success(res.message, 'Success!');
  //           this.form_group.reset();
  //         }
  //         else {
  //           this.toastr.error(res.message, 'Error!');
  //         }
  //       }, (err: any) => {
  //         this.toastr.error(JSON.stringify(err));
  //       });
  //     } else this.toastr.error('Fill the Right Information!', 'Error!');

  //   } catch (ex: any) {
  //     throw ex;
  //     alert(ex.message);
  //   }
  // }
  // toggleNavDrawer(isDrawerOpen: boolean) {
  //   this.isDrawerOpen = isDrawerOpen;
  //   this.drawerToggleEmitter.emit(this.isDrawerOpen);
  // }
  backToPrevious() {
    // this.location.back();
    this.router.navigate(['/Service']);
  }
}