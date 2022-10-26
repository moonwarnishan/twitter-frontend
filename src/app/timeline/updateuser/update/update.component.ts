import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userName:string="";
  userData:any;
  updateForm:any;
  dob:any;
  constructor(
    private userService : UsersService,
    private formbuilder : FormBuilder,
    private route :Router

  ) { 
    
  }

  ngOnInit(): void {
    this.userName=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'];
    this.userService.getUserByUserName(this.userName).subscribe(
      (res)=>{
        this.userData = res;
        this.dob=new Date(this.userData['dateOfBirth']).toISOString().split('T')[0];
        this.updateForm=this.formbuilder.group({
          userName: [this.userData['userName']],
          name:[this.userData['name'],Validators.required],
          dateOfBirth:[this.dob,[Validators.required,this.ageValidator]]
        })
      },
      (err)=>{
        alert("Something Went Wrong")
      },
    );
  }

  OnSubmit()
  {
    if(this.updateForm.valid)
    {
      this.userService.updateUser(this.updateForm.value).subscribe(
        data=>
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Data has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigate(['timeline']);
        },
        err=>
        {
          Swal.fire({
            icon: 'error',
            text: 'Something went wrong!',
          })
        }
      )
    }
    else
    {
      {
        Swal.fire({
          icon: 'error',
          text: 'please give proper Input',
        })
      }
    }
  }


  goToTimeline()
  {
    this.route.navigate(['/timeline']);
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
}
