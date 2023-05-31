import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontEndComponent } from './front-end.component';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSlickJsModule } from 'ngx-slickjs'
import { NgSelectModule } from '@ng-select/ng-select';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { AgmCoreModule } from '@agm/core';
import { LoginWithOtpComponent } from '../authentication/login-with-otp/login-with-otp.component';
import { ContactComponent } from './layout/contact/contact.component';
import { CreateContactComponent } from './layout/create-contact/create-contact.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SmsHeaderComponent } from './layout/sms-header/sms-header.component';
import { SmsHeaderCreateComponent } from './layout/sms-header-create/sms-header-create.component';
import { SmsTemplateComponent } from './layout/sms-template/sms-template.component';
import { SmsTemplateCreateComponent } from './layout/sms-template-create/sms-template-create.component';
import { WhatsappSendComponent } from './layout/whatsapp-send/whatsapp-send.component';
import { ApiSettingsComponent } from './layout/api-settings/api-settings.component';
import { SmsSendComponent } from './layout/sms-send/sms-send.component';
import { EmployeeCreateUpdateComponent } from './layout/employee-create-update/employee-create-update.component'
import { EmployeesComponent } from './layout/employees/employees.component'
import { tbl_roles } from '../model/tbl-model';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { VehicleTypeComponent } from './layout/vehicle-type/vehicle-type.component';
import{VehicleTypeCreateComponent} from './layout/vehicle-type-create/vehicle-type-create.component';
import {CreateVehicleComponent} from './layout/create-vehicle/create-vehicle.component';
import { VehicleComponent } from './layout/vehicle/vehicle.component';
import { TravelsComponent } from './layout/travels/travels.component';
import { CreateTravelComponent } from './layout/create-travel/create-travel.component';
const routes: Routes = [
  {
    path: '',
    component: FrontEndComponent,
    canActivate: [AuthenticationGuard],
    children: [
      // { path: '', redirectTo:'login', pathMatch: 'full',  },
      //{ path: '', redirectTo: 'login-with-otp', pathMatch: 'full', },
      { path: 'login-with-otp', component: LoginWithOtpComponent },
      {
        path: 'home', component: HomeComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin, tbl_roles.Operator] }
      },
      {
        path: 'contact', component: ContactComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin, tbl_roles.Operator] }
      },
      {
        path: 'create-contact', component: CreateContactComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin, tbl_roles.Operator] }
      },
      {
        path: 'whatsapp-send', component: WhatsappSendComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin, tbl_roles.Operator] }
      },
      {
        path: 'sms-template-create', component: SmsTemplateCreateComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },
      {
        path: 'sms-template', component: SmsTemplateComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },
      {
        path: 'sms-Header-create', component: SmsHeaderCreateComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },
      {
        path: 'sms-header', component: SmsHeaderComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },
      {
        path: 'sms-send', component: SmsSendComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin, tbl_roles.Operator] }
      },
      {
        path: 'employees', component: EmployeesComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },
      {
        path: 'api-settings', component: ApiSettingsComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin] }
      },
      {
        path: 'whatsapp-settings', component: ApiSettingsComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin] }
      },
      {
        path: 'UserProfile', component: UserProfileComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin, tbl_roles.Operator] }
      },
      {
        path: 'employees', component: EmployeesComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },

      {
        path: 'employee-create-update', component: EmployeeCreateUpdateComponent,
        canActivate: [AuthenticationGuard],
        data: { roles: [tbl_roles.Super_Admin, tbl_roles.Admin] }
      },
      {
        path:'vehicle-type',component:VehicleTypeComponent
      },
      {

        path:'vehicle-type-create',component:VehicleTypeCreateComponent
      },
      {

        path:'create-vehicle',component:CreateVehicleComponent
      },
      {
        path:'vehicle',component:VehicleComponent
      },
      {
        path:'travels',component:TravelsComponent
      },
      {
        path:'create-travel',component:CreateTravelComponent
      }

    ]
  },


]

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    UserProfileComponent,
    AboutUsComponent,
    ContactComponent,
    CreateContactComponent,
    SmsSendComponent,
    SmsHeaderComponent,
    SmsHeaderCreateComponent,
    SmsTemplateComponent,
    SmsTemplateCreateComponent,
    WhatsappSendComponent,
    EmployeesComponent,
    ApiSettingsComponent,
    EmployeeCreateUpdateComponent,
    VehicleTypeCreateComponent,VehicleTypeComponent, VehicleComponent,CreateVehicleComponent, TravelsComponent, CreateTravelComponent

  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    NgbModule, BrowserAnimationsModule, SlickCarouselModule, NgxScannerQrcodeModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCXUEzJM6DtsnYJwoegStPWG9-Dqn2G0sI' }),
    // AgmCoreModule.forRoot({apiKey:'AIzaSyDP2yeqdQK2_pJrl6_Hmjb4usYxEVStA4s'}),
    NgxSlickJsModule.forRoot({
      links: {
        jquery: "https://code.jquery.com/jquery-3.4.0.min.js",
        slickJs: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js",
        slickCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
        slickThemeCss: "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"
      }
    }),
CsvModule , NgxDatatableModule,


  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    HomeComponent,


  ]
})
export class FrontEndModule { }
