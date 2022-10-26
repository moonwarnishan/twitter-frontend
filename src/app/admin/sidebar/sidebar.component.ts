import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  username=" ";
  constructor(
    private loginservice : LoginService,
    private route : Router
    ) { }

  ngOnInit(): void {
    this.username=JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'] ;
  }

  logout()
  {
    this.loginservice.logout();
    this.route.navigate(['auth/login']);
  }

  profileView()
  {
    this.route.navigate(['admin/profile/'+this.username]);
  }

  userview()
  {
    this.route.navigate(['/timeline']);
  }

}
