import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Store } from '@ngxs/store';
import { Customer } from '../store/customer/customer.action';
import { Router } from '@angular/router';

/**
 * Add customer details
 */
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  /**
   * 
   * @param store to dispatch events
   * @param customerService to store the input values
   * @param router to navigate to certainer route
   */
  constructor(private store: Store, public customerService: CustomerService, private router: Router) {
    this.reset();
  }

  /**
   * Displatch action to save the customer details
   * If success, reset the input fields
   */
  public saveCustomeDetails() {
    this.store.dispatch(new Customer.Save(this.customerService.customerDetail)).subscribe(res => {
      this.reset();
    });
  }

  /**
   * Function to reset the values entered in input fields
   */
  private reset() {
    this.customerService.customerDetail = {
      name: '',
      email: '',
      phone: '',
      address: '',
    };
  }

  /**
   * Redirection to home.
   */
  public redirectToHome() {
    this.router.navigate(['home']);
  }
}
