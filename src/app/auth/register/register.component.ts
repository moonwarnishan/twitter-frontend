import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/Services/register.service';
import { MustMatch} from 'src/app/_validators/must-match.validator';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  error:any;
  constructor(private formBuilder : FormBuilder,
    private registerService :RegisterService , private route:Router,private matDialog: MatDialog) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required,this.ageValidator]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  }); }



   get f() { return this.registerForm.controls; }

   onSubmit() {
       this.submitted = true;
      if(this.registerForm.invalid)
       {
         
       }
       else
        {
          this.registerService.postUser(this.registerForm.value).subscribe(
            (data)=>
            {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registration Success',
                showConfirmButton: false,
                timer: 1500
              })
              window.location.reload();
            },
            err=>
            {
              this.error=err;
              if(this.error.error.errors.userName!==undefined)
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'UserName already exist. try another',
                })
              }
              else if(this.error.error.errors.email!==undefined)
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'email already exist. try another',
                })
              }
              else
              {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went Wrong try again later',
                })
              }
            }
          )
        }    
   }

   onReset() {
       this.submitted = false;
       this.registerForm.reset();
   }

  ngOnInit(): void {
  }
 


  ageValidator(control:FormControl)
  {
    if(control.value!=null)
    {
      let age=moment().diff(control.value,'years');
      if(age<12)
      {
        return {'age':true};
      }
      else
      {
        return null;
      }
    }
    return null;
  }

  cancel()
  {
    this.registerForm.reset();
    this.matDialog.closeAll();
  }
}
