import { State, StateContext, Selector, Action, createSelector } from '@ngxs/store';
import { CustomerDetailsStateModel } from './customer.model';
import { Customer } from './customer.action';
import { Injectable } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2'

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

  public static filter(id: string) {
    return createSelector([CustomerDetailsState], (state: CustomerDetailsStateModel) => {
      return state.Customer.filter(detail => detail.id.includes(id))
    });
  }

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
          Swal.fire({
            title: 'Success',
            text: 'Successfully added customer details',
            icon: 'success'
          });
          return ctx.patchState({
            Customer: response
          });
        }, (error) => {
          const errorMessage = error.error.email ? error.error.email[0] : error.error?.phone[0];
          Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
          });
        }
      )
    );
  }
}