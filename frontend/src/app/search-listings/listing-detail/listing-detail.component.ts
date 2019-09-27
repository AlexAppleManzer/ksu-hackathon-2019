import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {
  listing = 
  {
    "item": {
        "id": "test",
        "accType": "cardname",
        "amount": 20
    },
    "acceptedAccTypes": "cardname",

    "_id": "e3b3899e-0e4b-4e19-ac41-d5bcd30686f0",

    "active": true,
    "userId": "test",
    "description": "testdesc",
    "created": "2019-09-26T19:24:59.562Z",
    "__v": 0
}
  constructor() { }

  ngOnInit() {
  }

}
