import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { BackendServiceService } from 'src/app/services/backend-service.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  accounts: any[];

  listingForm = new FormGroup({
    description: new FormControl(''),
    accType: new FormControl(),
    sell: new FormControl()
  });

  constructor(private backendService: BackendServiceService) { }

  ngOnInit() {

    this.backendService.listAccounts().subscribe(
      results => this.accounts = results
    );

    this.backendService.getAccTypes().subscribe(
      results => this.options = results
    );

    this.filteredOptions = this.listingForm.get('accType').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.listingForm.value);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
