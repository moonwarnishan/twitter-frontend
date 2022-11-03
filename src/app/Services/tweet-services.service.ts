import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { userName } from 'src/Models/user';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class TweetServicesService {

  thisuser=""
  constructor(
    private apis : ApiServicesService,
    private http : HttpClient
  ) { 
    this.thisuser=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString() ;
  }

  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})
  }


  private _refreshrequired=new Subject<void>();
  get refreshRequired()
  {
    return this._refreshrequired;
  }
  newTweet(tweet:any) :Observable<object>
  {
    Object.assign(tweet,{userName:this.thisuser});
    return this.http.post(this.apis.createTweet,tweet,this.httpOptions);
  }
  delete(tweetId:any) :Observable<object>
  {
    return this.http.delete(this.apis.createTweet+'/'+this.thisuser+'/'+tweetId,this.httpOptions);
  }
  DeleteTweet() :Observable<object>
  {
    return this.http.get(this.apis.deleteTweet+this.thisuser,this.httpOptions);
  }


  addComment(tweetId:any,receiverUserName:any,userName:any,content:any) : Observable<object>
  {
    Object.assign(content,{userName:this.thisuser})
    return this.http.put(this.apis.createComment+tweetId+'/'+receiverUserName+'/'+userName,content,this.httpOptions);
  }
  deleteComment(tweetId:any, commentId:any) :Observable<object>
  {
    return this.http.put(this.apis.deleteComment+tweetId+'/'+commentId+'/'+this.thisuser,"",this.httpOptions);
  }

  getlikecommentRetweet(tweetId:any) : Observable<object>
  {
    return this.http.get(this.apis.getlikecommentretweet+tweetId,this.httpOptions);
  }


  likeTweet(tweetId:any,receiverUserName:any) :Observable<object>
  {
    return this.http.put(this.apis.likeorDeletelike+tweetId+'/'+receiverUserName+'/'+this.thisuser,"",this.httpOptions);
  }
  newRetweet(tweetId:any,receiverUserName:any) :Observable<object>
  {
    return this.http.put(this.apis.CreateOrDeleteRetweet+tweetId+'/'+receiverUserName+'/'+this.thisuser,{userName:this.thisuser},this.httpOptions);
  }

  getTweetByUserName(userName:any,page:any) : Observable<object>
  {
    return this.http.get(this.apis.getTweetbyUserName+userName+'/'+page,this.httpOptions);
  }
 
 

  tweetSavetoMongo()
  {
    return this.http.get(this.apis.LoginServiceBasepath+"ConsumeTweet/"+this.thisuser,this.httpOptions)
  }
  
}
