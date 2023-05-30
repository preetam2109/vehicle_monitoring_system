import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { tbl_login, tbl_sms_header } from 'src/app/model/tbl-model';
import { BaseServiceService } from 'src/app/service/base-service.service';
import Swal from 'sweetalert2';
import { ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-sms-header',
  templateUrl: './sms-header.component.html',
  styleUrls: ['./sms-header.component.css']
})
export class SmsHeaderComponent implements OnInit {
  tbl_sms_header: tbl_sms_header[] = [];
  private tempData: any
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 50;
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isDrawerOpen = false;
  base:any;
  constructor(private toastr: ToastrService,private baseServiceService: BaseServiceService) {
   this.base=Base;
   this.UserDetail=JSON.parse(localStorage.getItem('currentUser') || '{}')
  
   }
  
  ngOnInit(): void {
    this.getData();
   
  }
  
  
  getData() {
    try {
      this.baseServiceService.get('sms_header').subscribe((res: any) => {
        if (res.status == 'success') {
          // console.log(JSON.stringify(res))
          this.tbl_sms_header = res.data.entity_data;
          this.tempData = res.data.entity_data;
        } else this.toastr.error(res.message, 'Error');
      },
        error => {
          throw error;
        });
    } catch (ex: any) { this.toastr.error(ex.message) }
  }
  
  
  onDelete(id: any) {
    var status: number = -1
    Swal.fire({
      text: 'Are you sure you want to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((res) => {
      if (res.isConfirmed == true) {
        this.baseServiceService.delete('sms_header?status'+ id+ '&status=' + status)
  
          .subscribe(
            (res: any) => {
              if (res.status == 'success') {
                let index: number = this.tbl_sms_header.findIndex(a=> a.id ==id);
  
                if (index != -1) {
                  this.tbl_sms_header.splice(index, 1);
                  this.tbl_sms_header = [...this.tbl_sms_header];
                  this.toastr.success(res.message, 'Success!');
  
  
                }
              }else this.toastr.error(res.message, 'Error!');
  
            },error => {
              this.toastr.error('Something went wrong, please try again!', 'Error!');
            }
          );
      }
    })
  }

  filterUpdate(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.tempData.filter(function (d: { header: string; }) {
      return d.header.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.tbl_sms_header = temp;
  }
  public openPDF():void  { this.baseServiceService.download_PDF(document.getElementById('htmlData'),'user contactlist.pdf');}
  
  toggleNavDrawer(isDrawerOpen: boolean) {
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  
  }
  