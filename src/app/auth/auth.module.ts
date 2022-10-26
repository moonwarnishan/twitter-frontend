import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ResetPassCodeSentEmailComponent } from './reset-pass-code-sent-email/reset-pass-code-sent-email.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ResetPassCodeSentEmailComponent,
    ResetPassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class AuthModule { }
