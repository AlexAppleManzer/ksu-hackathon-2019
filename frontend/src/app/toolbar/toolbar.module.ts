import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

import { MatSliderModule } from '@angular/material/slider';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { GoogleLoginComponent } from './google-login/google-login.component'
import { SocialLoginModule, GoogleLoginProvider, AuthServiceConfig } from 'angular-6-social-login'
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MainToolbarComponent,
    GoogleLoginComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    SocialLoginModule,

  ],
  exports: [
    MainToolbarComponent
  ]
})
export class ToolbarModule { }
