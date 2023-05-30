import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Base } from 'src/app/helper/base';
import { md_api_key, tbl_api, tbl_api_key, tbl_login, tbl_sms_header, tbl_sms_template } from 'src/app/model/tbl-model';
import { BaseServiceService } from 'src/app/service/base-service.service';
import Swal from 'sweetalert2';
import { ColumnMode} from '@swimlane/ngx-datatable';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'src/app/model/response';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sms-settings',
  templateUrl: './sms-settings.component.html',
  styleUrls: ['./sms-settings.component.css']
})
export class SmsSettingsComponent implements OnInit {
  tbl_api_key :tbl_api_key=new  tbl_api_key()
  tbl_api:tbl_api =new tbl_api()
  md_api_key={} as md_api_key;
  tempData: any
  ColumnMode = ColumnMode;
  basicSelectedOption: number = 50;
  UserDetail:any;
  drawerToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  isDrawerOpen = false;
  base:any;
  id:any;
  fg:FormGroup;
  form_data:any;
  form_data_api:any;
  type:any;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private baseServiceService: BaseServiceService,
    private formBuilder: FormBuilder
  ) {
    this.base = Base;

    this.UserDetail = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.fg =new FormGroup({
      tbl_api: 
        new FormGroup({
          id: new FormControl('', Validators.required),
          url: new FormControl('', Validators.required),
                  }),
    
      tbl_api_key: new FormArray([
      ])
    });
  }
get form_array() {
    return this.fg.get('tbl_api_key') as FormArray;
  }
 onAddRow(title?:any, key?:any, value?:any) {
    // this.form_array.push(new FormControl('', Validators.required));
    this.form_array.push(new FormGroup({
      title: new FormControl(title),
      key: new FormControl(key, [Validators.required]),
      value: new FormControl(value),
    }));
    // const control = <FormArray>this.fg.controls['tbl_api_key'];
    // control.push(new FormControl())
  }
  
  onDeleteRow(index:number) {
    // this.form_array.push(new FormControl('', Validators.required));
    this.form_array.removeAt(index);
    // const control = <FormArray>this.fg.controls['tbl_api_key'];
    // control.push(new FormControl())
  }
  
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params)=>{
      this.type = params.get('type');
      });
      this.getData();
  }
 
  
  getData(){
    try{
    this.baseServiceService.get('setting?entity_type=' + this.type).subscribe( (res: any) => {
      if(res.status=="success"){
      this.form_data = JSON.parse(res.data.entity_data[0].api_key_list);
      this.fg.get('tbl_api.id')?.setValue(res.data.entity_data[0].id);
      this.fg.get('tbl_api.url')?.setValue(res.data.entity_data[0].url);
        this.form_data.forEach((element: any) => {
          this.onAddRow(element?.title,element?.key,element?.value)
        })
      }  else this.toastr.error(res.message, 'Error!');
      },
      // error => {
      //   alert(JSON.stringify(error)) } 
    );
    }catch(ex:any){throw ex;}
  }
  
  on_submit() {
    try{
      // console.warn('KKK :::: ',this.fg.value)
      if( this.fg.valid){
        this.fg.get('tbl_api.type')?.setValue(this.type)
        this.baseServiceService.post('setting', this.fg.value )
        .subscribe(
          (res:any) => {
            if(res.status=="success")this.toastr.success('Contact added successfully!', 'Success!');
            else this.toastr.error(res.message, 'Error!');
          }
        );
      }else  this.toastr.error('Invalid data!', 'Error!');//{console.warn('Form Error :::: ' ,this.fg.errors);}
      }catch(ex:any){
        this.toastr.error(ex.message, 'Error!');
        throw ex;
      }
    }

  toggleNavDrawer(isDrawerOpen: boolean) {
  
    this.isDrawerOpen = isDrawerOpen;
    this.drawerToggleEmitter.emit(this.isDrawerOpen);
  }
  
  }
  
  