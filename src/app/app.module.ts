import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontEndModule } from './front-end/front-end.module';
import { FrontEndComponent } from './front-end/front-end.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { ResetCheckPasswordComponent } from './authentication/reset-check-password/reset-check-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { LoginWithOtpComponent } from './authentication/login-with-otp/login-with-otp.component';
import { TokenInterceptor } from './helper/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSlickJsModule } from 'ngx-slickjs'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { NgToggleModule } from 'ng-toggle-button';
import { AgmCoreModule } from '@agm/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SplashComponent } from './authentication/splash/splash.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FourZeroFourComponent } from './authentication/error/four-zero-four/four-zero-four.component';
import { GlobalErrorHandlerService } from './helper/global-error-handler.service';
import { CsvModule } from '@ctrl/ngx-csv';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FuelRefillingComponent } from './fuel-refilling/fuel-refilling.component';
import { CreateFuelRefillingComponent } from './create-fuel-refilling/create-fuel-refilling.component';

@NgModule({
    declarations: [
        AppComponent,
        FrontEndComponent,
        LoginComponent,
        RegistrationComponent,
        OtpComponent,
        ResetCheckPasswordComponent,
        ResetPasswordComponent,
        LoginWithOtpComponent,
        SplashComponent,
        FourZeroFourComponent,
        ContactUsComponent,
        FuelRefillingComponent,
        CreateFuelRefillingComponent
    ],
    exports: [NgSelectModule,],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FrontEndModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        NgbModule,
        SlickCarouselModule,
        NgSelectModule,
        NgxSlickJsModule,
        NgxScannerQrcodeModule, NgToggleModule, NgxSpinnerModule,
        AgmCoreModule.forRoot({
            // apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw' 
            apiKey: 'AIzaSyDC9TvQPnLNFftSC9MVb2voI7NH9_3YLPI',
        }),
        NgxDatatableModule,
        QRCodeModule,
        NgxQRCodeModule, CsvModule,
    ]
})
export class AppModule { }
