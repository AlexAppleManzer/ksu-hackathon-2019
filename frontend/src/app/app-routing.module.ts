import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingDetailComponent } from './search-listings/listing-detail/listing-detail.component';
import { SearchPageComponent } from './search-listings/search-page/search-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { CreateListingComponent } from './search-listings/create-listing/create-listing.component';
import { AddCardComponent } from './account/add-card/add-card.component';


const routes: Routes = [
  { path: 'listing/search', component: SearchPageComponent },
  { path: 'listing/detail/:id', component: ListingDetailComponent },
  { path: 'listing/create', component: CreateListingComponent },
  { path: 'account/create', component: AddCardComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
