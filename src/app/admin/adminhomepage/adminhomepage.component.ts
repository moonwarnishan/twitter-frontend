import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminhomepage',
  templateUrl: './adminhomepage.component.html',
  styleUrls: ['./adminhomepage.component.css']
})
export class AdminhomepageComponent implements OnInit {
  userslist:any[]=[];

  users:any=[];
  p: number = 1;
  total: number = 0;
  isAdmin=false;
  isBlockedByAdmin=false;
  adinStat="";
  blockStat="";
  constructor(
    private userServices : UsersService,
    private adminService : AdminservicesService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.adminService.refreshRequired.subscribe(
      ()=>
      {
        this.getAllUsers();
      }
    )
  }

  getAllUsers()
  {
    this.userServices.getAllUsers().subscribe(
      (data:any)=>
      {
        this.users=[];
        this.userslist=data;
        for(var u of this.userslist)
        {
          if(u['userName']!==JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'])
          {
            this.users.push(u);
          }
          
        }
      },
      (error)=>
      {
        
      }
    );
  }

  Update(userName:any)
  {
    this.route.navigate(['/admin/update/'+userName]);
  }
  
  Block(username:any) 
  {
    Swal.fire({
      title: 'Are you sure block this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!'
    }).then(
      (result)=>
      {
        if(result.isConfirmed)
        {
          this.adminService.blockUserbyAdmin(username).subscribe(
            (res)=>
            {
              Swal.fire(
                'Blocked',
                'User Blocked',
                'success'
              )
              this.getAllUsers();
            }
            ,
            err=>
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
            }
          );
        }
      }
    )
  }

  Unblock(username:any)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure unblock this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unblock!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.unblockUserbyAdmin(username).subscribe(
          ()=>
          {
            {
              this.getAllUsers();
              Swal.fire(
                'Unblocked',
                'the user has been unblocked.',
                'success'
              )
            }
          },
          err=>
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        );
      }
    })
  }


  MakeAdmin(userName:any)
  {
    Swal.fire({
      title: 'Are you sure make admin this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,'
    }).then(
      (result)=>
      {
        if(result.isConfirmed)
        {
          this.adminService.makeAdmin(userName).subscribe(
            (res)=>
            {
              this.getAllUsers()
              Swal.fire(
                'Done',
                'This user is now admin',
                'success'
              )
            }
            ,
            err=>
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
              
            }
          )
        }
      }
    );
  }
  RemoveAdmin(userName:any)
  {
    Swal.fire({
      title: 'Are you sure Remove  admin this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,'
    }).then(
      (result)=>
      {
        if(result.isConfirmed)
        {
          this.adminService.removeAdmin(userName).subscribe(
            (res)=>
            {
              this.getAllUsers()
              Swal.fire(
                'Removed',
                'User Removed From Admin.',
                'success'
              )
            }
            ,
            err=>
            {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
              
            }
          )
        }
      }
    );
  }
  
  pageChangeEvent(event: number){
    this.p = event;
    this.ngOnInit();
  }
}
