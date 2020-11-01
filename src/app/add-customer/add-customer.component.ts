import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Store } from '@ngxs/store';
import { Customer } from '../store/customer/customer.action';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  constructor(private store: Store, public customerService: CustomerService) {
    this.reset();
  }

  ngOnInit(): void {
  }

  public saveCustomeDetails() {
    console.log(this.customerService.customerDetail)
    this.store.dispatch(new Customer.Save(this.customerService.customerDetail)).subscribe(res => {
      this.reset();
    });
  }

  private reset() {
    this.customerService.customerDetail = {
      name: '',
      email: '',
      phone: '',
      address: '',
    };
  }
}
