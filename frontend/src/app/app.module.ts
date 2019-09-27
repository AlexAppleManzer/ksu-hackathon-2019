import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchListingsModule } from './search-listings/search-listings.module';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';

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
    SearchListingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
