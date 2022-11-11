import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { FollowblockService } from 'src/app/Services/followblock.service';
import { TimelineService } from 'src/app/Services/timeline.service';
import { TweetServicesService } from 'src/app/Services/tweet-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  tweetId = "";
  tweet : any;
  like = false;
  retweet = false;
  comments : any[] = [];
  reTweets : any[] = [];
  likes : any[] = [];
  commentform : FormGroup;
  currentUser = "";
  thisuserTweet = false;
  thisusercomment = false;
  userName ="";
  isBlocked=false;
  retweetcolor=false;
  constructor(
    private activateRoute : ActivatedRoute,
    private timelineService : TimelineService,
    private formBuilder : FormBuilder,
    private tweetServices : TweetServicesService,
    private followBlockService : FollowblockService,
    private route: Router
  ) {
    this.tweetId = this.activateRoute.snapshot.params['tweetid'];
    this.userName = this.activateRoute.snapshot.params['username'];
    this.currentUser = JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString();
    this.followBlockService.isBlocked(this.userName).subscribe(
    (res)=>
    {
      if(res===true)
      {
        this.isBlocked=true;
      }
    }
    )
    this.commentform = this.formBuilder.group({
      commentText:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.GetTweetInstant();
  }

  GetTweetInstant()
  {
    this.timelineService.getSpecificTweet(this.userName,this.tweetId).subscribe(
      (res)=>
      {
        this.tweet=res;
      },
      err=>
      {
        console.log(err);
      }
    );
  }

  getTweet()
  {
    interval(2500).subscribe((val)=>
    {
      this.timelineService.getSpecificTweet(this.userName,this.tweetId).subscribe(
        (res)=>
        {
          this.tweet=res;
          console.log(this.tweet);
        },
        err=>
        {
          console.log(err);
        }
      );
    }
    )
  }

  onSubmit(tweetId:any,userName:any)
  {
    this.tweetServices.addComment(tweetId,userName,this.currentUser,this.commentform.value).subscribe(
      ()=>
      {
        this.GetTweetInstant();
        this.commentform.reset();
        
      }
    );
    this.GetTweetInstant();
    this.getTweet();
    this.commentform.reset();
  }
  deleteComment(tweetId:any,commentId:any)
  {
    this.tweetServices.deleteComment(tweetId,commentId).subscribe(
      (data)=>
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Comment deleted',
          showConfirmButton: false,
          timer: 1500
        })
        this.GetTweetInstant()
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

  deleteTweet(tweetId:any)
  {
    this.tweetServices.delete(tweetId).subscribe(
      ()=>
      {
        
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tweet has been deleted',
          showConfirmButton: false,
          timer: 1500
        })
        this.route.navigate(['timeline']);
      },
      err=>
      console.log(err)
    );
  }


  likeOrDislike(tweetId:any,userName:any)
  {
    this.Like(tweetId,userName);  
  }
  Like(tweetId:any,userName:any)
  {
    this.tweetServices.likeTweet(tweetId,this.userName).subscribe(
      (data)=>
      {
        this.GetTweetInstant();
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
    if(document.getElementById('retweet')!.style.color==="blue")
    {
      document.getElementById('retweet')!.style.color = "";
    }
    this.Retweet(tweetId,userName);
    
  }

  Retweet(tweetId:any,userName:any)
  {
    this.tweetServices.newRetweet(tweetId,this.userName).subscribe(
      (data)=>
      {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.GetTweetInstant()
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
    if(retweets?.some(person => person['userName'] === this.currentUser)){
      this.retweetcolor=true;
      return true;
    } 
  else{
    this.retweetcolor=false;
      return false;
   }
  }

}
