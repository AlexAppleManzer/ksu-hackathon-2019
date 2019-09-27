  
import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { Routes, RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule, } from '@angular/material/form-field';
import {MatInputModule, MatExpansionModule, MatCardModule, MatButtonModule} from '@angular/material';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [
  { path: '', component: SearchPageComponent},
];

@NgModule({
  declarations: [SearchPageComponent, ListingDetailComponent, CreateListingComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  exports: [
  ]
})
export class SearchListingsModule { }