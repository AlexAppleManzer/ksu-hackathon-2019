import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [MainSidebarComponent],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    MainSidebarComponent
  ],
})
export class SidebarModule { }
