import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private path : ApiServicesService, private http:HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*'})}
  public postUser(user:any)
  {
    return this.http.post(this.path.register,user,this.httpOptions);
  }

  public login(loginModel:any)
  {
    return this.http.post(this.path.login,loginModel,this.httpOptions);
  }


}
