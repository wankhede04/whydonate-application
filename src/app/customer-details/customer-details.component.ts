import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ICustomerDetails } from '../models/customer';
import { CustomerDetailsState } from '../store/customer/customer.state';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  public customerDetails: ICustomerDetails;

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

  ngOnInit(): void {
  }

  public redirectToHome() {
    this.router.navigate(['home']);
  }
}
