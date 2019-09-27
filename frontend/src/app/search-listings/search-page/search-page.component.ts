import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],

   
})
export class SearchPageComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Steam', 'Itunes', 'Walmart'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
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
// testing enter 
  heroes =[]; 
  addHero(newHero:string){
    if (newHero){
      this.heroes.push(newHero)
    
    }
   
  }

  removeHero(index: number) {
    this.heroes[index];
    this.heroes.splice(index,1);
  }

  have =[];
  addHave(newHave:string){
    if(newHave){
      this.have.push(newHave)
    }
  }

}