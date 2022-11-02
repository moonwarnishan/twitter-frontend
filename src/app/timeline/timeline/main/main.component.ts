import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { LoginService } from 'src/app/Services/login.service';
import { TimelineService } from 'src/app/Services/timeline.service';
import { TweetServicesService } from 'src/app/Services/tweet-services.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {  
  tweetForm:FormGroup;
  tweetList  : any[]=[];
  tweetList1:any;
  currentUser:any;
  retweetcolor=false;
  commentform:FormGroup;
  constructor
  (
    private formBuilder:FormBuilder,
    private tweetServices : TweetServicesService,
    private timeLineService : TimelineService,
    private route: Router
  ) {
    this.currentUser=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString();

    this.tweetForm=this.formBuilder.group(
      {
        tweetText:['',Validators.required]
      }
    )
    this.commentform=this.formBuilder.group({
      commentText:['',Validators.required]
    })
   }

    

  ngOnInit(): void {
    
    this.getTweetInstantRedis();
    this.getTweetTimer();
    this.timeLineService.refreshRequired.subscribe(
      (res)=>
      {
        this.getTweetInstant();
      }
    )
  }

  
  getTweetInstant()
  {
    this.timeLineService.getTweets().subscribe(
      (res:any)=>
      {
        this.tweetList=res;
      }
    )
  }

  getTweetInstantRedis()
  {
    this.timeLineService.getTweetsRedis().subscribe(
      (res:any)=>
      {
        this.tweetList=res;
      }
    )
  }



  getTweetTimer()
  {
    interval(15000).subscribe(
      (res)=>
      {
        this.getTweetInstant();
        this.DeleteTweet();
        this.consumeTweet();
      }
    )
  }

  consumeTweet()
  {
    this.tweetServices.tweetSavetoMongo().subscribe();
  }
  DeleteTweet()
  {
    this.tweetServices.DeleteTweet().subscribe();
    this.getTweetInstantRedis();
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

  buttonDisable()
  {
    //(document.getElementById('tweetpost') as any).disabled = true;
    if(this.tweetForm.value['tweetText']==="")
    {
      return false;
    }
    return true
  }


  onTweetSubmit()
  {
    if(this.tweetForm.valid)
    {
      this.tweetServices.newTweet(this.tweetForm.value).subscribe(
        (res)=>
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 1500
          })
          this.getTweetInstant();
          this.DeleteTweet();
          this.consumeTweet();
          this.tweetForm.reset();
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


  tweetView(tweetid:any)
  {
    this.route.navigate(['/timeline/tweet/'+tweetid])
  }
  onSubmit(tweetId:any,receiverUserName:any)
  {
    this.tweetServices.addComment(tweetId,receiverUserName,this.currentUser,this.commentform.value).subscribe(
      ()=>
      {
        this.getTweetInstant();
          this.DeleteTweet();
          this.consumeTweet();
        this.commentform.reset();
        
      }
    );
  }

  deleteComment(tweetId:any,commentId:any)
  {
    this.tweetServices.deleteComment(tweetId,commentId).subscribe(
      (data)=>
      {
        this.getTweetInstant();
          this.DeleteTweet();
          this.consumeTweet();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Comment deleted',
          showConfirmButton: false,
          timer: 1500
        })
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
          this.getTweetInstant();
          this.getTweetInstantRedis();
          this.DeleteTweet();
          this.consumeTweet();
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


  likeOrDislike(tweetId:any,receiverUserName:any)
  {
      this.Like(tweetId,receiverUserName);
  }
  Like(tweetId:any,receiverUserName:any)
  {
    this.tweetServices.likeTweet(tweetId,receiverUserName).subscribe(
      (data)=>
      {
          this.getTweetInstant();
          this.getTweetInstantRedis();
          this.DeleteTweet();
          this.consumeTweet();
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



  retweetOrDeleteRetweet(tweetId:any,receiverUserName:any)
  {
    this.Retweet(tweetId,receiverUserName);
  }

  Retweet(tweetId:any,receiverUserName:any)
  {
    this.tweetServices.newRetweet(tweetId,receiverUserName).subscribe(
      (data)=>
      {
          this.getTweetInstant();
          this.DeleteTweet();
          this.consumeTweet();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        
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
  

  reload()
  {
    window.location.reload()
  }
  

}
