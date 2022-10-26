import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { ResetPassCodeSentEmailComponent } from '../reset-pass-code-sent-email/reset-pass-code-sent-email.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private route : Router,
    private matDialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    
  }

  openLogin()
  {
    this.matDialog.open(LoginComponent);
  }
  openRegister()
  {
    this.matDialog.open(RegisterComponent);
  }

  openResetPass()
  {
    this.matDialog.open(ResetPassCodeSentEmailComponent)
  }
  cancel()
  {
    this.matDialog.closeAll()
  }

}
