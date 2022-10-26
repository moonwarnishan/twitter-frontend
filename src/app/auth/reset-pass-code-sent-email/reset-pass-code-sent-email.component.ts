import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
import { PassResetService } from 'src/app/Services/pass-reset.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass-code-sent-email',
  templateUrl: './reset-pass-code-sent-email.component.html',
  styleUrls: ['./reset-pass-code-sent-email.component.css']
})
export class ResetPassCodeSentEmailComponent implements OnInit {

  MailSend:FormGroup;
  userId:any;
  constructor(
    private formbuilder : FormBuilder,
    private passresetService : PassResetService,
    private route : Router,
    private matDialog: MatDialog
  ) {
    this.MailSend=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
   }

  ngOnInit(): void {
  }
  onSubmit()
  {
    this.passresetService.SendEmailUser(this.MailSend.value['email']).subscribe(
      (res)=>
      {
        this.userId=res;
        localStorage.removeItem('userId');
        localStorage.setItem('userId',this.userId);
        Swal.fire({
          text:'a email with OTP sent to your email. please check It'
        })
        this.matDialog.closeAll();
        this.route.navigate(['/auth/passwordreset']);
      },
      err=>
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No user Found with this email',
        })
      }
    );
  }

}
