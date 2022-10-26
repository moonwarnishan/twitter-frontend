import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServicesService } from './api-services.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowblockService {
  path="";
  follower=""
  constructor(private apis:ApiServicesService, private http:HttpClient) { 
    this.follower=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString() ;
  }

  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})
  }

  private _refreshrequired=new Subject<void>();
  get refreshRequired()
  {
    return this._refreshrequired;
  }

  NewFollow(following:string) : Observable<Object>
  {
    this.path=this.apis.newFollow+this.follower+'/'+following;
    return this.http.post(this.path,"",this.httpOptions);
  }

  unFollow(unfollow : string) : Observable<Object>
  {
    return this.http.delete(this.apis.unfollow+this.follower+'/'+unfollow,this.httpOptions);
  }

  isFollow(following:any) 
  {
    this.path=this.apis.checkFollow+following+'/'+this.follower;
    return this.http.get(this.path,this.httpOptions);
  }

  followerFollowingCount(userName:any) :  Observable<Object>
  {
    return this.http.get(this.apis.followerFollowingCount+userName,this.httpOptions);
  }

  blockUser(userName:string)
  {
    return this.http.post(this.apis.blockUser+this.follower+'/'+userName,"",this.httpOptions);
  }
  isBlocked(userName:any)
  {
    return this.http.get(this.apis.isBlocked+this.follower+'/'+userName,this.httpOptions);
  }
  blockList() :  Observable<Object>
  {
    const userName= JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'];
    return this.http.get(this.apis.blocklist+userName,this.httpOptions);
  }
  unBlock(blockedUser:any) :  Observable<Object>
  {
    const userName= JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'];
    return this.http.delete(this.apis.unBlockUser+userName+'/'+blockedUser,this.httpOptions);
  }

  getFollowing(userName:string) :  Observable<Object>
  {
    return this.http.get(this.apis.getfollowing+userName,this.httpOptions);
  }
  getFollowers(userName:string) :  Observable<Object>
  {
    return this.http.get(this.apis.getfollowers+userName,this.httpOptions);
  }



}
