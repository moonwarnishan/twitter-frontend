import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServicesService } from './api-services.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {

  constructor(
    private http:HttpClient,
    private apis:ApiServicesService
  ) { }
  private _refresherRequired = new Subject<void>();
  get refreshRequired()
  {
    return this._refresherRequired;
  } 


  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})
  }


  blockUserbyAdmin(username:any) : Observable<object>
  {
    console.log(this.httpOptions)
    return this.http.put(this.apis.blockUserbyAdmin+username,"",this.httpOptions);
  }

  unblockUserbyAdmin(username:any) : Observable<object>
  {
    return this.http.put(this.apis.unblockUserbyAdmin+username,"",this.httpOptions);
  }

  isBlockedByAdmin(username:any) : Observable<object>
  {
    return this.http.get(this.apis.isblockbyAdmin+username,this.httpOptions);
  }

  makeAdmin(username:any) : Observable<object>
  {
    return this.http.put(this.apis.makeAdmin+username,"",this.httpOptions);
  }
  removeAdmin(username:any) : Observable<object>
  {
    return this.http.put(this.apis.removeAdmin+username,"",this.httpOptions);
  }
  isAdmin(username:any) : Observable<object>
  {
    return this.http.get(this.apis.isAdmin+username,this.httpOptions);
  }
  updateUserByAdmin(userName:any,userdata:any) : Observable<object>
  {
    return this.http.put(this.apis.updateUserByAdmin+userName,userdata,this.httpOptions);
  }


}
