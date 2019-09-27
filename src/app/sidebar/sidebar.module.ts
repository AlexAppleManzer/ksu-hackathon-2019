import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';



@NgModule({
  declarations: [MainSidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MainSidebarComponent
  ],
})
export class SidebarModule { }
