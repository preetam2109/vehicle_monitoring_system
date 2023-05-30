import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/front-end/layout/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { OtpComponent } from './authentication/otp/otp.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ResetCheckPasswordComponent } from './authentication/reset-check-password/reset-check-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginWithOtpComponent } from './authentication/login-with-otp/login-with-otp.component';
import { SplashComponent } from './authentication/splash/splash.component';
import { FourZeroFourComponent } from './authentication/error/four-zero-four/four-zero-four.component';
import { tbl_roles } from './model/tbl-model';
import { Role } from './model/role';
import { ContactUsComponent } from './contact-us/contact-us.component';
const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo:'splash-screen' },
  { path: '', pathMatch: 'full', redirectTo: 'splash' },
  // { path: 'home', component:HomeComponent},

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'splash',
    component: SplashComponent
  },
  {
    path: 'login-with-otp',
    component: LoginWithOtpComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'reset-check-password',
    component: ResetCheckPasswordComponent
  },
  {
    path: 'error-404',
    component: FourZeroFourComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'front-end',
    loadChildren: () => import('./front-end/front-end.module').then(m => m.FrontEndModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
