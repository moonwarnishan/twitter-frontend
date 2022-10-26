import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesService } from './api-services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apipath : ApiServicesService,
    private http : HttpClient,
    private route : Router
    ) { }
    httpOptions = { headers: new HttpHeaders({ 'Content-Type':'application/json','Access-Control-Allow-Origins':'*'})}
    //login
    loginUser(loginInfo: any) {
      return this.http.post(this.apipath.login, loginInfo, this.httpOptions);
    }
    //isloggedIn
    isLoggedIn() {
      return !!localStorage.getItem('loginInfo');
    }
    
    //logout
    logout() {
      localStorage.removeItem('loginInfo');
      this.route.navigate(['auth/login']);
    }


    //refresh token
    refreshToken() {
      
    }

}
