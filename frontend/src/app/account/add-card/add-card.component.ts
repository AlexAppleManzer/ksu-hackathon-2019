import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from 'src/app/services/backend-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  options: string[] = [];
  accountForm = new FormGroup({
    balance: new FormControl(0),
    type: new FormControl(),
  });

  constructor(private router: Router, private backendService: BackendServiceService) { }

  ngOnInit() {
    this.backendService.getAccTypes().subscribe(
      results => this.options = results
    );
  }

  onSubmit() {
    this.backendService.postAccount(this.accountForm.value).subscribe(
      results => console.log('success'),
      err => console.log(err),
      () => this.router.navigate(['listing/create'])
    );
  }

}
