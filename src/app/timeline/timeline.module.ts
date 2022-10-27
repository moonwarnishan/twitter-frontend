import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineRoutingModule } from './timeline-routing.module';
import { TimelineComponent } from './timeline/timeline.component';
import { SidebarComponent } from './timeline/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './timeline/main/main.component';
import { SearchComponent } from './timeline/search/search.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileComponent } from './profile/userprofile/userprofile.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { FollowerandfollowingComponent } from './followerandfollowing/followerandfollowing.component';
import { BlockeduserlistComponent } from './blockeduserlist/blockeduserlist.component';
import { BlocklistComponent } from './blockeduserlist/blocklist/blocklist.component';
import { FolllowerfollowComponent } from './followerandfollowing/folllowerfollow/folllowerfollow.component';
import { UpdateComponent } from './updateuser/update/update.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    TimelineComponent,
    SidebarComponent,
    MainComponent,
    SearchComponent,
    ProfileComponent,
    UserprofileComponent,
    UpdateuserComponent,
    FollowerandfollowingComponent,
    BlockeduserlistComponent,
    BlocklistComponent,
    FolllowerfollowComponent,
    UpdateComponent,
    NotificationsComponent,
    TweetComponent
  ],
  imports: [
    CommonModule,
    TimelineRoutingModule,
    FontAwesomeModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class TimelineModule { }
