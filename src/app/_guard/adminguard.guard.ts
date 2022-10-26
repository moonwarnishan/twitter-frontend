import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminservicesService } from '../Services/adminservices.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  userType:any;
  constructor(private route:Router)
  {
    if(localStorage.getItem('loginInfo')===null)
    {
        this.userType="";
    }
    else
    {
      this.userType= JSON.parse(localStorage.getItem('loginInfo') || '' )['role'];
    }
    
  }
  canActivate():boolean
  {
    
    if(this.userType==="Admin")
    {
      return true;
    }
    else if(this.userType==="User")
    {
      this.route.navigate(['timeline']);
      return false;
    }
    else
    {
      this.route.navigate(['auth']);
      return false;
    }
  }
  
}
