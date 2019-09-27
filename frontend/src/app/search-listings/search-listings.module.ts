import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
