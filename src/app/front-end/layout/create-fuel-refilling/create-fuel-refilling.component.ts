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
import { tbl_fuel_refilling, tbl_login, tbl_travel, tbl_vehicle } from 'src/app/model/tbl-model';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-create-fuel-refilling',
  templateUrl: './create-fuel-refilling.component.html',
  styleUrls: ['./create-fuel-refilling.component.css']
})
export class CreateFuelRefillingComponent implements OnInit {
  login_form: FormGroup;
  res_data: any;
  isDrawerOpen = false;
  @Output()
  base: any;
  filedata: any;
  UserDetail: any;
  submitted = false;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private baseServiceService: BaseServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.base = Base;
    this.UserDetail = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.login_form = this.formBuilder.group({
      id:[''],
      vehicle_id: ['',[Validators.required]],
      refilling_date: ['',new Date()],
      quantity:['',[Validators.required]],
      fuel_station: ['',[Validators.maxLength(100)]],
      station_address: ['',[Validators.maxLength(100)]],

      
    });
  }
  
  ngOnInit(): void {
    this.onGet();
    this.route.queryParams.subscribe(params => {
      debugger
      if(params['id'] != null)
      this.login_form.patchValue({
        id:params['id'],
        vehicle_id: params['vid'],
        refilling_date: params['rd'],
        quantity: params['qty'],
        fuel_station: params['ft'],
        station_address:params['sa'],

      });
      
    });
    
  }


  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  get formcontrols() {
    return this.login_form.controls;
  }

  onGet(){ 
    this.baseServiceService.get('fuel_refilling/form_data_get')
    .subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.res_data = res.data;
        }
        else this.toastr.error(res.message, 'Error!');
      }
    );
  }



  onChange(files: any) {
    
    this.filedata = files.target.files[0];
  }
  on_submit() {
    if(this.login_form.valid){
      this.baseServiceService.post('fuel_refilling', this.login_form.value )
      .subscribe(
        (res:any) => {
          if(res.status=="success"){    
          this.toastr.success(res.message, 'Success!');
          if(this.login_form.value.id==''||this.login_form.value.id==null)
          this.login_form.reset();
        
        }        
          
        if(res.status=="error"){    
          this.toastr.error(res.message, 'Error!');

        }
        }
        
        
        ,(error) => {throw error }
     
      );
   
    }else this.toastr.error('Fill the Right Information!','Error!');
    
  
  }
}
