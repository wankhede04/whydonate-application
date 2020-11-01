import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICustomerPayload } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  /**
   * Public variable of IcustomerPayload type to assign input values
   */
  public customerDetail: ICustomerPayload;

  /*
  Instance of HttpClient created for API calls
  */
  constructor(private http: HttpClient) {}

  /**
   * Get customers details API call
   */
  public getCustomerData(): Observable<any> {
    return this.http.get(
      `${environment.serverUrl}${environment.apiPrefix}customer/`
    );
  }

  /**
   * Save customer details API call
   * @param payload 
   */
  public saveCustomerData(payload: any): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}${environment.apiPrefix}customer/`,
      payload
    );
  }
}
