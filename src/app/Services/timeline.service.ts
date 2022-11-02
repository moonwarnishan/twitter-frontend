import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  currentUser="";
  constructor(
    private apis : ApiServicesService,
    private http : HttpClient
  ) { 
    this.currentUser=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'].toString() ;
  }
  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})
  }
  private _refreshrequired=new Subject<void>();

  get refreshRequired() 
  {
    return this._refreshrequired;
  }
  getTweets(page : any): Observable<object>
  {
    return this.http.get(this.apis.getalltweet+this.currentUser+'/'+page,this.httpOptions);
  }

  getTweetsRedis(): Observable<object>
  {
    return this.http.get(this.apis.getalltweetRedis+this.currentUser,this.httpOptions);
  }

  getSpecificTweet(userName:any,tweetId : any): Observable<object>
  {
    return this.http.get(this.apis.getSpecificUsertweet+userName+'/'+tweetId,this.httpOptions);
  }
  getTweetByUser(userName:any): Observable<object>
  {
    return this.http.get(this.apis.getTweetbyUserName+userName,this.httpOptions);
  }



}
