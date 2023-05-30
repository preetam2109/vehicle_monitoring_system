import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute } from '@angular/router';
import { tbl_login, tbl_sms_header, tbl_vehicle_type } from 'src/app/model/tbl-model';
import { Base } from 'src/app/helper/base';
import { BaseServiceService } from 'src/app/service/base-service.service';



@Component({
  selector: 'app-vehicle-type-create',
  templateUrl: './vehicle-type-create.component.html',
  styleUrls: ['./vehicle-type-create.component.css']
})
export class VehicleTypeCreateComponent implements OnInit {
  isDrawerOpen = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  UserDetail:any;
  contact_form:FormGroup;
  tbl_vehicle_type = new tbl_vehicle_type();
  
  base:any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private baseServiceService: BaseServiceService, private route: ActivatedRoute) {
      this.base=Base;
      this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
      this.contact_form = this.formBuilder.group({
        vehicle_type: ['',[Validators.required]],
        id:['']
    })
  }
  //   ngOnInit(): void {
  //   let id = null;
  //   var vehicle_type =undefined;
  //   this.route.queryParamMap.subscribe((params) => {
  //     id = params.get('entity_id');
  //     vehicle_type = params.get('vehicle_type')?.toString();
  //   });
  //   if (id != null) { this.contact_form.patchValue({
  //     vehicle_type:  vehicle_type
  //   }); this.tbl_vehicle_type.id= id; 
  // }
  // }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['id'] != null)
      this.contact_form.patchValue({
        vehicle_type: params['vt'],
        id:params['id'],
      });
      
    });
    
  }
  toggleNavDrawer(isDrawerOpen: boolean) {
  
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get formcontrols() {
    return this.contact_form.controls;
  }
  
  on_submit() {
    if(this.contact_form.valid == true){
    this.tbl_vehicle_type=this.contact_form.value
      this.baseServiceService.post('vehicle_type', this.tbl_vehicle_type )
      .subscribe(
        (res:any) => {
          if(res.status=="success"){    
          this.toastr.success(res.message, 'Success!');
          this.contact_form.reset();}        
          else
          this.toastr.success(res.message, 'Success!');
  
  
  
        },(error) => {throw error }
     
      );
   
    }else this.toastr.error('Fill the Right Information!','Error!');
    
  
  }
  
    
  

  
  
  }
  