import { Component, OnInit } from '@angular/core';
import { Observable,interval } from 'rxjs';
import { NotificationsService } from 'src/app/Services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications$ :any;
  thisUser:any;
  constructor(
    private notificationServices : NotificationsService
  ) { }

  ngOnInit(): void {
    
    this.getInstant();
    this.getAll();
    this.notificationServices.refreshRequired.subscribe(
      response=>
      {
        this.getAll();
      }
    );
  }
 getInstant()
 {
  this.notificationServices.getAllNotifications().subscribe(
    val=>
    {
      this.notifications$=val;
    }
  )
 }

  getAll()
  {
    interval(5000).subscribe(
      (x)=>
      {
        this.notificationServices.getAllNotifications().subscribe(
          val=>
          {
            this.notifications$=val;
            
          }
        )
      }
    )
  };

}
