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
import { tbl_login, tbl_travel, tbl_vehicle } from 'src/app/model/tbl-model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.component.html',
  styleUrls: ['./create-travel.component.css']
})
export class CreateTravelComponent implements OnInit {
  login_form: FormGroup;
  res_data: tbl_travel = new tbl_travel();
  vehicle_name:any
  
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
      vehicle_id: ['', [Validators.required]],
      vehicle_number: [''],
      vehicle_type:[''],
      distance: ['',[Validators.required,]],
      travel_date:[''],
      create_by:[''],
      meter_start:['0'],
      meter_end:['0'],
      unit: [''],
      id:['']
      
    });
  }
  
  ngOnInit(): void {
    this.onGet();
    this.route.queryParams.subscribe(params => {
      debugger
      if(params['id'] != null)
      this.login_form.patchValue({
        vehicle_id: params['vid'],
        vehicle_number: params['vnum'],
        vehicle_type: params['vt'],
        distance: params['vd'],
        travel_date: params['td'],
        id:params['id'],
        meter_start:params['mt'],
        meter_end:params['me'],

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
    this.baseServiceService.get('travels')
    .subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.vehicle_name= res.data.entity_data;
          console.log(this.vehicle_name)
        }
        else this.toastr.error(res.message, 'Error!');
      }
    );
  }



  onChange(files: any) {
    
    this.filedata = files.target.files[0];
  }
  on_submit() {
    debugger
    debugger
    if(this.login_form.valid){
      this.baseServiceService.post('travels', this.login_form.value )
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
