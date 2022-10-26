import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../timeline/profile/profile.component';
import { UserprofileComponent } from '../timeline/profile/userprofile/userprofile.component';
import { AdminguardGuard } from '../_guard/adminguard.guard';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';

const routes: Routes = [
  {
     path:'',
     component:AdminhomepageComponent,
     canActivate:[AdminguardGuard]
  },
  {
    path:'update/:username',
    component:UpdateUserDataComponent,
    canActivate:[AdminguardGuard]
  },
  {
    path:'profile/:username',
    component:ProfilesComponent,
    canActivate:[AdminguardGuard]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
