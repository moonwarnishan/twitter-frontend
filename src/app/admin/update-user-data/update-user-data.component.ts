import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
  styleUrls: ['./update-user-data.component.css']
})
export class UpdateUserDataComponent implements OnInit {

  userName:string="";
  userData:any;
  updateForm:any;
  dob:any;
  constructor(
    private userService : UsersService,
    private formbuilder : FormBuilder,
    private activateRoute:ActivatedRoute,
    private route :Router,
    private adminServices : AdminservicesService

  ) { 
   
  }

  ngOnInit(): void {
    this.userName = this.activateRoute.snapshot.params['username'];
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
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        })
      },
    );
  }

  OnSubmit()
  {
    if(this.updateForm.valid)
    {
      this.adminServices.updateUserByAdmin(this.userName,this.updateForm.value).subscribe(
        data=>
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.route.navigate(['admin']);
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
      alert("Please Give Proper Input");
    }
  }


  goToHome()
  {
    this.route.navigate(['/admin']);
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
