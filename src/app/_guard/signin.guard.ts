import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SigninGuard implements CanActivate {
  constructor(private loginServices:LoginService, private route : Router) { }
  canActivate():boolean
  {
    if(this.loginServices.isLoggedIn())
    {
      return true;
    }
    else
    {
      this.route.navigate(['auth']);
      return false;
    }
  }
  
}
