import { ICustomerDetails, ICustomerPayload } from '../../models/customer';

export namespace Customer {
  export class Get {
    static readonly type = '[Note] Get Customer';
  }

  export class Save {
    static readonly type = '[Note] Create Customer';
    constructor(public payload: ICustomerPayload) {}
  }
}
