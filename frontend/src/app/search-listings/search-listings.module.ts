  
import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { Routes, RouterModule } from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule, } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [
  { path: '', component: SearchPageComponent},
];

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  //BrowserAnimationsModule
  ],
  exports: [
    RouterModule
  ]
})
export class SearchListingsModule { }