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

/**
 * Customer details state to manage the states of all received response from API.
 */
@State<CustomerDetailsStateModel>({
  name: 'customer',
  defaults: INITIAL_STATE_DETAILS
})
@Injectable()
export class CustomerDetailsState {
  /**
   * 
   * @param customerService of CustomerService
   */
  constructor(private customerService: CustomerService) {}

  /**
   * Filter the customer details by ID.
   * @param id 
   */
  public static filter(id: string) {
    return createSelector([CustomerDetailsState], (state: CustomerDetailsStateModel) => {
      return state.Customer.filter(detail => detail.id.includes(id))
    });
  }

  @Selector()
  public static getCustomer(state: CustomerDetailsStateModel) {
    return state.Customer;
  }

  /**
   * Get and store cutsomers details
   * @param ctx for getting the current state
   * @param action for putting the getter value
   * @function Swal to show the alert message
   */
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
          Swal.fire({
            title: 'Error',
            text: error.error,
            icon: 'error'
          });
        }
      )
    );
  }

  /**
   * Save the customer details with payload
   * @param ctx for getting the current state
   * @param action for putting the getter value
   * @function Swal to show the alert message
   */
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