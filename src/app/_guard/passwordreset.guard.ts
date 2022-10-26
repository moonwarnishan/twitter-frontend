import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PasswordresetGuard implements CanActivate {
  constructor(private route:Router){}
  canActivate():boolean
  {
    if(localStorage.getItem('userId'))
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
