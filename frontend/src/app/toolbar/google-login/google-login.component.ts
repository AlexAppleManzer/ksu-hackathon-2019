import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
declare const gapi: any;

@Component({
  selector: 'app-google',
  template: '<button mat-button (click)="socialSignIn(\'google\')">{{message}}</button>'
})
export class GoogleLoginComponent implements OnInit {
  message = 'Sign in';

  constructor( private socialAuthService: AuthService ) {}
  
  ngOnInit(): void {
    this.message = localStorage.getItem('currentUser') ? 'Sign out' : 'Sign in';
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    const user = localStorage.getItem('currentUser');
    if(user) {
      localStorage.removeItem('currentUser');
      this.ngOnInit();
    } else {
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.ngOnInit();
        }
      );
    }
  }
}
