import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminservicesService } from 'src/app/Services/adminservices.service';
import { FollowblockService } from 'src/app/Services/followblock.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  userName: any;
  user:any;
  noUserFound:any=false;
  ownProfile:any;
  MakeOrRemoveAdmin:string="make admin";
  blockOrUnblock:string="block";
  follower:string="0";
  following:string="0";
  isBlocked=false;
  isAdmin=false;
  Blocked:any;
  userBlocked="";
  constructor(
    private activateRoute : ActivatedRoute,
    private followblockService:FollowblockService,
    private route: Router,
    private userService:UsersService,
    private adminService : AdminservicesService
    ) 
    {
      this.userName = this.activateRoute.snapshot.params['username'].toString();
      this.userService.getUserByUserName(this.userName).subscribe(
        (data)=>
        {
          this.user=data;
        },
        err=>console.log(err)
      );
    }
    
  
  ngOnInit(): void {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    if(this.userName.toLowerCase()===JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toLowerCase())
    {
      this.ownProfile=true;
    }
    else
    {
      this.ownProfile=false;
    }

    this.openingfunctions();
    this.adminService.refreshRequired.subscribe(
      ()=>
      {
        this.openingfunctions()
      }
    )

  }

  openingfunctions()
  {
    this.followblockService.followerFollowingCount(this.userName).subscribe(
      (data:any)=>{
          this.follower=data['follower'];
          this.following=data['following'];
      },
      err=>
      {
        console.log("something Went Wrong")
      }
    );
    this.adminService.isAdmin(this.userName).subscribe(
      (res:any)=>
      {
        this.isAdmin=res
        if(this.isAdmin===true)
        {
          this.MakeOrRemoveAdmin="remove admin"
        }
        else
        {
          this.MakeOrRemoveAdmin="make admin"
        }
      }
      ,
      err=>
      console.log(err)
    );
    
    this.adminService.isBlockedByAdmin(this.userName).subscribe(
      (res:any)=>{
        this.isBlocked=res
        if(this.isBlocked===true)
        {
          this.blockOrUnblock="unblock"
        }
        else
        {
          this.blockOrUnblock="block"
        }
      },
      err=>
      console.log(err)
    )
  }


  makeOrRemoveAdmin()
  {
    if(this.MakeOrRemoveAdmin==="make admin")
    {
      this.MakeAdmin(this.userName);
    }
    else if(this.MakeOrRemoveAdmin==="remove admin")
    {
      this.RemoveAdmin(this.userName);
      this.openingfunctions();
    }
    
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
              this.openingfunctions();
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
              this.openingfunctions();
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
              this.openingfunctions()
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
              this.openingfunctions()
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

  BlockOrUnblock()
  {
    if(this.blockOrUnblock==="block")
    {
      this.Block(this.userName);
    }
    else if(this.blockOrUnblock==="unblock")
    {
      this.Unblock(this.userName);
    }
  }

  editProfile()
  {
    this.route.navigate(['admin/update/'+this.userName]);
  }

}
