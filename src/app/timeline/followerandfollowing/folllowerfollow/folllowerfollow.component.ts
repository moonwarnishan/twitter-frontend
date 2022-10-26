import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowblockService } from 'src/app/Services/followblock.service';
import { UsersService } from 'src/app/Services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-folllowerfollow',
  templateUrl: './folllowerfollow.component.html',
  styleUrls: ['./folllowerfollow.component.css']
})
export class FolllowerfollowComponent implements OnInit {

  followings:[]=[];
  followers:any[]=[];
  isfollow=false;
  isblocked=false;
  ownProfile=false;
  userName:any;
  currentUser:any;
  myfollowings:any;
  myblocklist:any;
  constructor(
    private userService : UsersService,
    private activateRoute : ActivatedRoute,
    private route : Router,
    private followblockService:FollowblockService
  ) {
      this.userName = this.activateRoute.snapshot.params['userName'].toString();
      this.currentUser=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString()
   }

  ngOnInit(): void {
    this.getFollowers();
    this.getFollowing();
    this.MyFollowing();
    this.MyBlocklist()
    this.followblockService.refreshRequired.subscribe(
      ()=>
      {
        this.getFollowers();
        this.getFollowing();
      }
    )
  }

  getFollowing()
  {
    this.followblockService.getFollowing(this.userName).subscribe(
      (data:any)=>
      this.followings=data,
      err=>
      {

      }
    );
  }
  getFollowers()
  {
    this.followblockService.getFollowers(this.userName).subscribe(
      (data:any)=>
      {
        this.followers=data;
      },
      error=>
      {
       
      }
    );
  }


  follow(username:any)
  {
    this.followblockService.NewFollow(username).subscribe(
      ()=>
      {
        this.getFollowers();
        this.getFollowing();
        this.MyFollowing();
        this.MyBlocklist()
      }
      ,
      err=>
      {

      }
    );
  }

  unfollow(row:any)
  {
    this.followblockService.unFollow(row).subscribe(
      (msg)=>{
        {
          
          this.getFollowers();
          this.getFollowing();
          this.MyFollowing();
          this.MyBlocklist()
        }
      },
      err=>
      {
        
      }
    );
  }

  block(row:any)
  {

    Swal.fire({
      title: 'Are you sure?',
      text: "you want to block this user",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block '
    }).then((result) => {
      if (result.isConfirmed) {
        this.followblockService.unFollow(row).subscribe(
          (msg)=>{
            this.followblockService.blockUser(row).subscribe(
              data=>{
                this.getFollowers();
                this.getFollowing();
                this.MyFollowing();
                this.MyBlocklist()
                Swal.fire(
                  'Blocked!',
                  'User has been blocked.',
                  'success'
                )
              },
              err=>
              {
                
              }
            );
          }
        );
      }
    }
  )
}

  gotoprofile(userName:string)
  {
    this.route.navigate(['/timeline/profile/'+userName]);
  }


  IsCurrentUser(userName:any)
  {
    if(this.currentUser===userName)
    {
      return true;
    }
    return false;
  }

  MyFollowing()
  {
    this.followblockService.getFollowing(this.currentUser).subscribe(
      (data:any)=>
      {
        this.myfollowings=data
      }
      ,
      err=>
      {

      }
    );
  }

  MyBlocklist()
  {
    this.followblockService.blockList().subscribe(
      (data)=>
      {
        this.myblocklist=data;
      }
    )
  }

}
