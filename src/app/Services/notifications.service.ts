import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, Subject } from 'rxjs';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  errorHandels : any
  constructor(
    private http : HttpClient,
    private apis : ApiServicesService
  ) { }

  
  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})
  }


  private _refreshrequired=new Subject<void>();
  get refreshRequired()
  {
    return this._refreshrequired;
  }

  getAllNotifications(page:any):Observable<object>
  {
    const userName= JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'];
    return this.http.get(this.apis.notificationsBasePath+userName+'/'+ page, this.httpOptions);
  }

}
