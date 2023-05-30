import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { tbl_vehicle_type } from 'src/app/model/tbl-model';
import { BaseServiceService, dt_properties } from 'src/app/service/base-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  api_controller_name= 'vehicle_type'; res_data: any; res_data_filter: tbl_vehicle_type[] = [];; base: any; dt: any;
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
      ['/vehicle-type-create'],
      { queryParams: { id: row.id,vt:row.vehicle_type} }
    );
  }
  // onEdit = (entity_id: any) => this.router.navigate(['/vehicle-type-create'], { queryParams: { entity_id: entity_id} });

  onDelete(entity_id: any) {
    Swal.fire({ text: 'Are you sure you want to delete?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No' })
      .then((res) => {
        if (res.isConfirmed == true) {
          this.bs.delete( this.api_controller_name + '?entity_id=' + entity_id + '&status=' + -1)
            .subscribe((res: any) => {
              if (res.status == 'success') {
                let index: number = this.res_data_filter.findIndex(a => a.id == entity_id);
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
    this.res_data_filter = this.res_data.filter(function (d: { vehicle_type: string; }) {
      return d.vehicle_type.toLowerCase().indexOf(val) !== -1 || !val;
    });
  }

  onDownload_PDF = (): void => this.bs.download_PDF(document.getElementById('datatable'), document.getElementById('page_title')?.innerText + '.pdf');

  isDrawerOpen = false; @Output() drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(); toggleNavDrawer(isDrawerOpen: boolean) { this.isDrawerOpen = isDrawerOpen; this.drawerToggleEmitter.emit(this.isDrawerOpen); }

  onSubmit() { }
  onChange() { }
  onCheck() { }
}



