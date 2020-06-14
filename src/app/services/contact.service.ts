import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CustomResponse } from '../models/CustomResponse';
import { FormGroup } from '@angular/forms';

/**
 * Send all Http requests for handling golf bookings
 *
 * @author Malcolm Roy
 */

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    constructor(private http: HttpClient) {

    }

    /**
     * Get the logged in user's bookings
     */
    sendForm(form: FormGroup) {
      return this.http.post<CustomResponse>('https://api.haymakercoding.com/api/email/contact/index.php',
       { form })
      .pipe(map(response => {
        return response;
      }));
    }

}
