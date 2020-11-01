import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICustomerPayload } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customerDetail: ICustomerPayload;

  constructor(private http: HttpClient) {}

  public getCustomerData(): Observable<any> {
    return this.http.get(
      `${environment.serverUrl}${environment.apiPrefix}customer/`
    );
  }

  public saveCustomerData(payload: any): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}${environment.apiPrefix}customer/`,
      payload
    );
  }
}
