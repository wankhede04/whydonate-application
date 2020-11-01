import { State, StateContext, Selector, Action } from '@ngxs/store';
import { CustomerDetailsStateModel } from './customer.model';
import { Customer } from './customer.action';
import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { tap } from 'rxjs/operators';

const INITIAL_STATE_DETAILS: CustomerDetailsStateModel = {
  Customer: []
};

@State<CustomerDetailsStateModel>({
  name: 'customer',
  defaults: INITIAL_STATE_DETAILS
})
@Injectable()
export class CustomerDetailsState {
  constructor(private customerService: CustomerService) {}

  @Selector()
  public static getCustomer(state: CustomerDetailsStateModel) {
    return state.Customer;
  }

  @Action(Customer.Get)
  public getCustomer(ctx: StateContext<CustomerDetailsStateModel>, action: Customer.Get) {
    return this.customerService.getCustomerData().pipe(
      tap(
        (response) => {
          return ctx.patchState({
            Customer: response
          });
        }, (error) => {
          console.log('Error:', error);
        }
      )
    );
  }

  @Action(Customer.Save)
  public saveCustomer(ctx: StateContext<CustomerDetailsStateModel>, action: Customer.Save) {
    return this.customerService.saveCustomerData(action.payload).pipe(
      tap(
        (response) => {
          return ctx.patchState({
            Customer: response
          });
        }, (error) => {
          console.log('Error:', error);
        }
      )
    );
  }
}