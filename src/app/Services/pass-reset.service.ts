import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class PassResetService {

  constructor(
    private apis : ApiServicesService,
    private http : HttpClient
  ) 
  {
    
  }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*'})}

  SendEmailUser(Email:any)
    {
      return this.http.get(this.apis.sendMail + Email,this.httpOptions);
    }

    resetPass(info:any)
    {
      return this.http.post(this.apis.resetPass,info,this.httpOptions);
    }
}
