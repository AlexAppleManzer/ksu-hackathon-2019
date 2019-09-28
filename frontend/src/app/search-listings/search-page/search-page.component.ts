import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';



@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  options: string[] = ["one", "two", "three"];
  results: any[];
  filteredOptions: Observable<string[]>;
  searchForm = new FormGroup({
    acceptedAccTypes: new FormControl(),
    accType: new FormControl()
  });

  constructor(private backendService: BackendServiceService) {
  }

  ngOnInit() {
    this.backendService.getAccTypes().subscribe(
      results => this.options = results
    );
    this.onSubmit();
  }
   
  onSubmit() {
    console.warn(this.searchForm.value)
    this.backendService.queryListings(this.searchForm.value).subscribe(
      results => this.results = results,
    )
  }
}




