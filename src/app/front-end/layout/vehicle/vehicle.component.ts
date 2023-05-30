import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseServiceService, dt_properties } from 'src/app/service/base-service.service';
import { tbl_vehicle } from 'src/app/model/tbl-model';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
api_controller_name= 'vehicle';
res_data: any;
res_data_filter:tbl_vehicle[] = [];
base: any; 
dt: any;
 constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private bs: BaseServiceService, private router: Router) {
   this.base = Base; this.dt = dt_properties;
 }
 ngOnInit(){this.onGet();}

 onGet(){ 
   this.bs.get(this.api_controller_name)
   .subscribe(
     (res: any) => {
       if (res.status == 'success') {
         this.res_data = res.data.entity_data;
         this.res_data_filter = res.data.entity_data;
       }
       else this.toastr.error(res.message, 'Error!');
     }
   );
 }

 public onEdit(row:any)
 {
   debugger;
   this.router.navigate(
     ['/create-vehicle'],
     { queryParams: { id: row.id,vname:row.vehicle_name,vnum:row.vehicle_number, mileage:row.mileage, vt:row.vehicle_type_id,unit:row.unit } }
   );
 }
//  onEdit = (id: any) => this.router.navigate(['/create-vehicle'], { queryParams: { id: id } });

 onDelete(user_id: any) {
   Swal.fire({ text: 'Are you sure you want to delete?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No' })
     .then((res) => {
       if (res.isConfirmed == true) {
         this.bs.delete('vehicle?entity_id=' + user_id + '&status=' + -1)
           .subscribe((res: any) => {
             if (res.status == 'success') {
               let index: number = this.res_data_filter.findIndex(a => a.id == user_id);
               if (index != -1) {
                 this.res_data.splice(index, 1); this.res_data = [...this.res_data]; this.toastr.success(res.message, 'Success!');
               }
             }
             else this.toastr.error(res.message, 'Error!');
           });
       }
     })
   }

 onSearch(event: any) {
   const val = event.target.value.toLowerCase();
   this.res_data_filter = this.res_data.filter(function (d: {vehicle_name: string; }) {
     return d.vehicle_name.toLowerCase().indexOf(val) !== -1 || !val;
   });
 }

 onDownload_PDF = (): void => this.bs.download_PDF(document.getElementById('datatable'), document.getElementById('page_title')?.innerText + '.pdf');

 isDrawerOpen = false; @Output() drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(); toggleNavDrawer(isDrawerOpen: boolean) { this.isDrawerOpen = isDrawerOpen; this.drawerToggleEmitter.emit(this.isDrawerOpen); }

 onSubmit() { }
 onChange() { }
 onCheck() { }
}



