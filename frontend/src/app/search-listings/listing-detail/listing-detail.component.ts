import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {
  @Input() listing: any;

  constructor() { }

  ngOnInit() {
  }

  formatNumber(num: number) {
    return (num / 100.0).toFixed(2);
  }

}
