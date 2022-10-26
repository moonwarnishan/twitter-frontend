import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService : ApiServicesService , private http : HttpClient) { }
  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})}

    private _refreshrequired=new Subject<void>();
    get refreshRequired()
    {
      return this._refreshrequired;
    }
    
  getUserByUserName(userName : string)
  {
    return this.http.get(this.apiService.searchUserByUserName+userName,this.httpOptions);
  }
  updateUser( userInfo:any)
  {
    const userName= JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'];
    return this.http.put(this.apiService.updateUser+userName,userInfo,this.httpOptions);
  }
  
  getAllUsers() : Observable<object>
  {
    return this.http.get(this.apiService.getAllUsers,this.httpOptions);
  }
  

}
