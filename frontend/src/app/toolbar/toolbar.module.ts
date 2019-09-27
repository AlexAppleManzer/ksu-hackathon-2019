import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { GoogleLoginComponent } from './google-login/google-login.component'

@NgModule({
  declarations: [MainToolbarComponent, GoogleLoginComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    MainToolbarComponent,
    MatSliderModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule

  ]
})
export class ToolbarModule { }
