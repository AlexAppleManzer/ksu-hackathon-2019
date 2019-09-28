import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  endpoint = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  createListing(listing: any) : Observable<any> {
    return this.http.post(this.endpoint + '/listings', listing).pipe(
      tap( // Log the result or error
        data => console.log(listing, data),
        error => console.error(listing, error)
      )
    );
  }

  queryListings(queryParams: any) : Observable<any> {
    return this.http.get(this.endpoint + '/listings', {params: queryParams}).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  listAccounts() : Observable<any> {
    return this.http.get(this.endpoint + '/users/accounts').pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  postAccount(things: any) : Observable<any> {
    return this.http.post(this.endpoint + '/users/accounts', things).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  getAccTypes() : Observable<any> {
    return this.http.get(this.endpoint + '/accTypes').pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }
}
