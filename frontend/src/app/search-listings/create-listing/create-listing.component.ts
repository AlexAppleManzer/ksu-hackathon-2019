import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  listingForm = new FormGroup({
    description: new FormControl(''),
    accType: new FormControl(),
  });

  constructor() { }

  ngOnInit() {
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
