import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService : ApiServicesService , private http : HttpClient) { }
  httpOptions = { headers:
    new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*','Authorization':'Bearer '+JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken']})
  }
  getUsers(value:string)
  {
    return this.http.get(this.apiService.UserSearchBasePath+value,this.httpOptions);
  }

  getTweetByHashTag(value:string)
  {
    value=value.substring(1);
    return this.http.get(this.apiService.hashSearchBasePath+value,this.httpOptions);
  }

  
}
