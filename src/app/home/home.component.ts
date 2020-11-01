import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ICustomerDetails } from '../models/customer';
import { Customer } from '../store/customer/customer.action';
import { CustomerDetailsState } from '../store/customer/customer.state';
import { Router } from '@angular/router';

/**
 * Home to display all customers
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @Select(CustomerDetailsState.getCustomer)
  public customer$: Observable<ICustomerDetails[]>;

  /**
   * @param store to dispatch events
   * @param router to navigate to certainer route
   * Dispatched the get customers action
   */
  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new Customer.Get());
  }

  /**
   * Redirection to customer details page
   * @param customerID of the customer to filter data at details page
   */
  public showCustomerDetails(customerID: string) {
    this.router.navigate(['details'], {queryParams: {id: customerID}});
  }

  /**
   * Redirection to add customer details page
   */
  public redirectToAddCustomer() {
    this.router.navigate(['add']);
  }
}
