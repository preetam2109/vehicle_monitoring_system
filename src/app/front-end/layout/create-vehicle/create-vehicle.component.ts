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
import { tbl_login, tbl_vehicle } from 'src/app/model/tbl-model';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {

  login_form: FormGroup;
  res_data: tbl_vehicle = new tbl_vehicle();
  tbl_vehicle_type:any;
  vehicle_type:any
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
      vehicle_type_id:['',[Validators.required]],
      vehicle_name: ['', [Validators.required]],
      vehicle_number: ['', [ Validators.required]],
      mileage: ['',[Validators.required,]],
      unit: [''],
      id:['']
      
    });
  }
  
  ngOnInit(): void {
    this.onGet();
    this.route.queryParams.subscribe(params => {
      if(params['id'] != null)
      this.login_form.patchValue({
        vehicle_type_id: params['vt'],
        vehicle_name: params['vname'],
        vehicle_number: params['vnum'],
        mileage:params['mileage'],
        id:params['id'],
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
    this.baseServiceService.get("vehicle_type")
    .subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.vehicle_type= res.data.entity_data;
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
      this.baseServiceService.post('vehicle', this.login_form.value )
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
