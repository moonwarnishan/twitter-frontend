import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowblockService } from 'src/app/Services/followblock.service';
import { UsersService } from 'src/app/Services/users.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { TweetServicesService } from 'src/app/Services/tweet-services.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit ,OnDestroy {

  private subscription: Subscription[] = [];
  userName: any;
  user:any;
  noUserFound:any=false;
  ownProfile=false;
  followOrUnfollow:string="follow";
  blockOrUnblock:string="block";
  follower:string="0";
  following:string="0";
  isfollow:any;
  loadEdit:boolean=false;
  isBlocked:any;
  isAdmin=false;
  tweetList : any;
  retweetcolor=false;
  currentUser='';
  page=1;
  constructor(
    private activateRoute : ActivatedRoute,
    private userService : UsersService,
    private followblockService:FollowblockService,
    private route: Router,
    private tweetService : TweetServicesService
    ) 
    {
      this.userName = this.activateRoute.snapshot.params['userName'];
    }
    
  ngOnInit(): void {
    
    this.currentUser=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString();
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    debugger
    if(this.currentUser===this.userName)
    {
      this.ownProfile=true;
    }
    else
    {
      this.ownProfile=false;
    }
    this.followerFollowingCount();
    this.IsBlock();
    this.IsFollow();
    this.getTweetInstant();
    
  }

  getTweetInstant()
  {
    this.tweetService.getTweetByUserName(this.userName,this.page).subscribe(
      (res)=>
      {
        this.tweetList=res;
      }
    )
  }


  followerFollowingCount()
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
    }
    IsFollow()
    {
      this.followblockService.isFollow(this.userName).subscribe(
        (data:any)=>{
          this.isfollow=data;
          if(this.isfollow===true)
            {
              this.followOrUnfollow="unfollow";
            }
            else
            {
              this.followOrUnfollow="follow";
            }
            this.followerFollowingCount();
        },
        error=>{
          console.log("something went wrong");
        }
      );
    }
    IsBlock()
    {
      this.followblockService.isBlocked(this.userName).subscribe(
        (data)=>
        {
          this.isBlocked=data;
          if(this.isBlocked===false)
          {
            this.userService.getUserByUserName(this.userName).subscribe(
              (res)=>{
                this.user = res;
              },
              (err)=>{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Something Went Wrong',
                  showConfirmButton: false,
                  timer: 1500
                })
              },
            );
            if(!this.user)
            {
              this.noUserFound=true;
            }
          }
          else
          {
            this.isBlocked=true;
          }
         
        },
        (error)=>
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something Went Wrong',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
    }

  followUnfollow()
  {
    if(this.followOrUnfollow==="follow")
    {
      //http post
      this.followblockService.NewFollow(this.userName.toString()).subscribe(
        (msg)=>{
          console.log("success");
          this.followOrUnfollow="unfollow";
          this.IsFollow();
        },
        (err)=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something Went Wrong',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
      
    }
    else if(this.followOrUnfollow==="unfollow")
    {
      this.followblockService.unFollow(this.userName.toString()).subscribe(
        (msg)=>{
          console.log("success");
          this.followOrUnfollow="follow";
          this.IsFollow()
        },
        err=>
        {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something Went Wrong',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
      
    }
  }
  block()
  {
    if(this.blockOrUnblock=="block")
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
            this.followblockService.blockUser(this.userName).subscribe(
              data=>{
                this.blockOrUnblock="unblock";
                this.followblockService.unFollow(this.userName.toString()).subscribe();
                Swal.fire({
                  icon: 'success',
                  title: 'user blocked'
                });
                this.route.navigate(['/timeline/blocklist'])

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
        }
      )
    }
  }

  editProfile()
  {
    this.route.navigate(['timeline/update']);
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  likeOrDislike(tweetId:any)
  {
      this.Like(tweetId);
  }
  Like(tweetId:any)
  {
    this.tweetService.likeTweet(tweetId,this.userName).subscribe(
      (data)=>
      {
        this.getTweetInstant();
      },
      err=>
      {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        })
      }
    );
  }

  retweetOrDeleteRetweet(tweetId:any,userName:any)
  {
    this.Retweet(tweetId,userName); 
  }

  Retweet(tweetId:any,userName:any)
  {
    this.tweetService.newRetweet(tweetId,this.userName).subscribe(
      (data)=>
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTweetInstant()
      },
      err=>
      {
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        })
      }
    );
  }
  
  checkRetweet(retweets:any[])
  {
    if(retweets.some(person => person['userName'] === this.currentUser)){
      this.retweetcolor=true;
      return true;
    } 
  else{
    this.retweetcolor=false;
      return false;
   }
  }

  tweetView(userName:any,tweetid:any)
  {
    this.route.navigate(['/timeline/tweet/'+userName+'/'+tweetid])
  }
  deleteTweet(tweetId:any)
  {
    this.tweetService.delete(tweetId).subscribe(
      ()=>
      {
          this.getTweetInstant();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tweet has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
      },
      err=>
      console.log(err)
    );
  }

  loadmore()
  {
    this.tweetService.getTweetByUserName(this.userName,this.page+1).subscribe(
      (data)=>
      {
        this.tweetList=data;
        this.page++;
      }
    );

  }
  
}
