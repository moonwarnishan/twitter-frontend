import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminhomepageComponent } from './adminhomepage/adminhomepage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { UpdateUserDataComponent } from './update-user-data/update-user-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProfilesComponent } from './profiles/profiles.component';


@NgModule({
  declarations: [
    AdminhomepageComponent,
    SidebarComponent,
    SearchbarComponent,
    UpdateUserDataComponent,
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BsDropdownModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
