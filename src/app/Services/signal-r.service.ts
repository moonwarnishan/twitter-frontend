import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  token = "";
  username ="";
  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('loginInfo')||'' )['accessToken'];
    this.username = JSON.parse(localStorage.getItem('loginInfo')||'' )['userName'];
    console.log(this.username);
    this.start();
    this.connection.on("Notification",(data:any)=>
    {
      
      console.log(data)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }); 
   }
   
   private  connection: any = new HubConnectionBuilder()   // mapping to the chathub as in startup.cs                                       
              .withUrl("https://localhost:7206/livenotification?username="+JSON.parse(localStorage.getItem('loginInfo')||'' )['userName']) 
  .withAutomaticReconnect()
  .build();

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
      
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }
  


}
