import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:any;
  loginForm : FormGroup;
  submitted : boolean = false;
  constructor(
    private formBuilder : FormBuilder,
    private loginServices : LoginService,
    private route : Router,
    private matDialog: MatDialog
  ) { 
    this.loginForm=this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }
  
  get f() { return this.loginForm.controls; }

  onSubmit()
  {
    this.submitted=true;
    if(this.loginForm.valid)
    {
      this.loginServices.loginUser(this.loginForm.value).subscribe((token:any)=>{
        localStorage.setItem('loginInfo',JSON.stringify(token));
        if(token['role']==='Admin')
        {
          window.location.reload();
          this.route.navigate(['/admin']);
        }
        else
        {
          window.location.reload();
          this.route.navigate(['/timeline']);
        }
      }
      ,(err)=>{
        this.error=err;
        var err = this.error?.error?.split(':')[1];
        var er = err.split('\r')[0];
        if(er===' User is blocked')
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User is blocked. please contact admin',
          })
        }
        else if(this.error.status===500)
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong UserName or password',
          })
        }
        else
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Server Error',
          })
        }
      })
    }
    
  }

  onReset()
  {
    this.submitted=false;
    this.loginForm.reset();
  }
  ngOnInit(): void {
  }
  cancel()
  {
    this.loginForm.reset();
    this.matDialog.closeAll();
  }

}
