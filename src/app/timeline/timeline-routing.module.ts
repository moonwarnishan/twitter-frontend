import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotloginGuard } from '../_guard/notlogin.guard';
import { SigninGuard } from '../_guard/signin.guard';
import { BlockeduserlistComponent } from './blockeduserlist/blockeduserlist.component';
import { FollowerandfollowingComponent } from './followerandfollowing/followerandfollowing.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TweetComponent } from './tweet/tweet.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';


const routes: Routes = [
  {
    path:'',
    component: TimelineComponent,
    canActivate:[SigninGuard]
  },
  {
    path:'profile/:userName',
    component:ProfileComponent,
    //canActivate:[SigninGuard]
  },
  {
    path:'blocklist',
    component:BlockeduserlistComponent,
    canActivate:[SigninGuard]
  },
  {
    path:'followerFollow/:userName',
    component:FollowerandfollowingComponent,
    canActivate:[SigninGuard]
  },
  {
    path:'update',
    component:UpdateuserComponent,
    canActivate:[SigninGuard]
  },
  {
    path:'notifications',
    component:NotificationsComponent,
    canActivate:[SigninGuard]
  },
  {
    path:'tweet/:username/:tweetid',
    component:TweetComponent,
    canActivate:[SigninGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelineRoutingModule { }
