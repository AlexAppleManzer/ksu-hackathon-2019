import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { FormBuilder, FormGroup, FormArray, ValidatorFn } from '@angular/forms';



@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],

   
})
export class SearchPageComponent implements OnInit {

  myControl = new FormControl();
   options: string[] = ["one", "two" , "three"]; 
   
  filteredOptions: Observable<string[]>;
  form: FormGroup;
  constructor(private backendService: BackendServiceService) {
    
   }
  ngOnInit() {
    this.backendService.getAccTypes().subscribe(
      results => this.options = results
    );
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));

  }

   
  }



  
