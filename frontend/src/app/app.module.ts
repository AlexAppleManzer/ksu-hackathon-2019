import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { SearchListingsModule } from './search-listings/search-listings.module';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { getAuthServiceConfigs } from './configs';
import { AuthServiceConfig } from 'angular-6-social-login';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToolbarModule,
    SidebarModule,
    SearchListingsModule,
    MatCardModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
