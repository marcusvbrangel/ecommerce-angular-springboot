import {Customer} from './customer';
import {Address} from './address';
import {OrderItem} from './order-item';
import {Order} from './order';

export class Purchase {

  customer: Customer | undefined;
  shippingAddress: Address | undefined;
  billingAddress: Address | undefined;
  order: Order | undefined;
  orderItems: OrderItem[] | undefined;
  //
  // constructor() { }
  //
  // constructor(
  //   customer: Customer,
  //   shippingAddress: Address,
  //   billingAddress: Address,
  //   order: Order,
  //   orderItems: OrderItem[]
  // ) {
  //   this.customer = customer;
  //   this.shippingAddress = shippingAddress;
  //   this.billingAddress = billingAddress;
  //   this.order = order;
  //   this.orderItems = orderItems;
  // }

}
