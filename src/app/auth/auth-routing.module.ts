import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotloginGuard } from '../_guard/notlogin.guard';
import { PasswordresetGuard } from '../_guard/passwordreset.guard';
import { SigninGuard } from '../_guard/signin.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPassCodeSentEmailComponent } from './reset-pass-code-sent-email/reset-pass-code-sent-email.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate:[NotloginGuard]
  },
  {
    path:'resetpassemailSend',
    component:ResetPassCodeSentEmailComponent,
    canActivate:[NotloginGuard]
  },
  {
    path:'passwordreset',
    component:ResetPassComponent,
    canActivate:[NotloginGuard,PasswordresetGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
