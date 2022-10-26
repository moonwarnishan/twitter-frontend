import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PassResetService } from 'src/app/Services/pass-reset.service';
import { MustMatch} from 'src/app/_validators/must-match.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  mainForm:any;
  submitted = false;
  error:any
  passresetForm:FormGroup
  constructor(
    private formbuilder : FormBuilder,
    private resetpassService:PassResetService,
    private route : Router,
    private matDialog: MatDialog
  ) { 
    this.passresetForm=this.formbuilder.group(
      {
        token:['',[Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
        confirmPassword: ['', Validators.required]
      }
      , {
        validator: MustMatch('password', 'confirmPassword')
    }
    );
  }

  ngOnInit(): void {
    this.matDialog.closeAll();
  }

  
  get f() { return this.passresetForm.controls; }
  onSubmit()
  {
    this.submitted = true;
    const uId=localStorage.getItem('userId');
    const resetPassData={
      userId:uId,
      password:this.passresetForm.value['password'],
      token:this.passresetForm.value['token'].toString()
    }
    this.resetpassService.resetPass(resetPassData).subscribe(
      (data)=>
      {
        localStorage.removeItem('userId');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success. please login',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['auth'])
      },
      (err)=>
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong OTP or OTP expired. Try again',
        })
      }
    )
    
  }

}
