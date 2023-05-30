import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BaseServiceService, dt_properties } from 'src/app/service/base-service.service';
import { tbl_login } from 'src/app/model/tbl-model';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  // res_data: any; res_data_filter: any; 
  res_data: any; res_data_filter: tbl_login[] = [];; base: any; dt: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private bs: BaseServiceService, private router: Router) {
    this.base = Base; this.dt = dt_properties;
  }
  ngOnInit = () => this.onGet();

  onGet(){ 
    this.bs.get('employee')
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

  onEdit = (user_id: any) => this.router.navigate(['/employee-create-update'], { queryParams: { user_id: user_id } });

  onDelete(user_id: any) {
    Swal.fire({ text: 'Are you sure you want to delete?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No' })
      .then((res) => {
        if (res.isConfirmed == true) {
          this.bs.delete('employee?entity_id=' + user_id + '&status=' + -1)
            .subscribe((res: any) => {
              if (res.status == 'success') {
                let index: number = this.res_data_filter.findIndex(a => a.user_id == user_id);
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
    this.res_data_filter = this.res_data.filter(function (d: { name: string; }) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
  }

  onDownload_PDF = (): void => this.bs.download_PDF(document.getElementById('datatable'), document.getElementById('page_title')?.innerText + '.pdf');

  isDrawerOpen = false; @Output() drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>(); toggleNavDrawer(isDrawerOpen: boolean) { this.isDrawerOpen = isDrawerOpen; this.drawerToggleEmitter.emit(this.isDrawerOpen); }

  onSubmit() { }
  onChange() { }
  onCheck() { }
}



