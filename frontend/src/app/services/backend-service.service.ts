import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  endpoint = 'localhost:3000'

  constructor(private http: HttpClient) { }

  createListing(listing: any) : Observable<any> {
    return this.http.post(this.endpoint + '/listings', listing).pipe(
      tap( // Log the result or error
        data => console.log(listing, data),
        error => console.error(listing, error)
      )
    ); 
  }
}
