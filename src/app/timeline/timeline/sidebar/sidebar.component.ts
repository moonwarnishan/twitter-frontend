import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { SignalRService } from 'src/app/Services/signal-r.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isAdmin=false;
  username=" ";
  constructor(
    private loginservice : LoginService,
    private route : Router,
    private signalR : SignalRService
    ) { }

  ngOnInit(): void {
    this.username=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'] ;
    if(JSON.parse(localStorage.getItem('loginInfo')||'' )['role']=="Admin")
    {
      this.isAdmin=true;
    }
  }

  logout()
  {
    this.loginservice.logout();
    this.route.navigate(['auth/login']);
  }

  profileView()
  {
    this.route.navigate(['timeline/profile/'+this.username]);
  }

}
