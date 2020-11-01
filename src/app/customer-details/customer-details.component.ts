import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICustomerDetails } from '../models/customer';
import { CustomerDetailsState } from '../store/customer/customer.state';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Details of the customer
 */
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  public customerDetails: ICustomerDetails;

  /**
   * Get the the customer details by ID, if not found redirect to home.
   * @param store to dispatch events
   * @param router to navigate to certainer route
   * @param route to get the query parameters
   */
  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(param => {
      this.store.select(CustomerDetailsState.filter(param.id)).subscribe(res => {
        if (!res[0]) {
          this.router.navigate(['home']);
        }
        this.customerDetails = res[0];
      });
    });
  }

  /**
   * Redirection to home
   */
  public redirectToHome() {
    this.router.navigate(['home']);
  }
}
