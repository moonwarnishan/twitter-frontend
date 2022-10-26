import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FollowblockService } from 'src/app/Services/followblock.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-blocklist',
  templateUrl: './blocklist.component.html',
  styleUrls: ['./blocklist.component.css']
})
export class BlocklistComponent implements OnInit {

  blockedUsers : []=[];
  constructor(
    private route:Router,
    private followblockService: FollowblockService
  ) { }

  ngOnInit(): void {
    this.blockList();
    this.followblockService.refreshRequired.subscribe(
      ()=>
      {
        this.blockList();
      }
    );
  }

  blockList()
  {
    this.followblockService.blockList().subscribe(
      (data:any)=>
      {
        this.blockedUsers=data;
      },
      err=>
      {
        console.log("Something Went Wrong");
      }
    );
  }


  Unblock(row:any)
  {
    this.followblockService.unBlock(row).subscribe(
      ()=>
      {
        this.blockList();
      },
      err=>
      {
        alert("Something Went Wrong");
      }
    );
  }

}
