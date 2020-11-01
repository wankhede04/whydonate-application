import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ICustomerDetails } from '../models/customer';
import { Customer } from '../store/customer/customer.action';
import { CustomerDetailsState } from '../store/customer/customer.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(CustomerDetailsState.getCustomer)
  public customer$: Observable<ICustomerDetails[]>;

  constructor(private store: Store) {
    this.store.dispatch(new Customer.Get());
  }

  ngOnInit(): void {
  }
}
