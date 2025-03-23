import {Injectable} from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    let existingCartItem = this.cartItems.find(item => item.id === theCartItem.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems = [...this.cartItems, theCartItem];
    }

    this.computeCartTotals();

  }

  computeCartTotals() {

    const totalQuantityValue: number = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPriceValue = this.cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);

    this.totalQuantity.next(totalQuantityValue);
    this.totalPrice.next(totalPriceValue);

    this.logCartData(totalQuantityValue, totalPriceValue);

  }

  decrementQuantity(item: CartItem) {

    item.quantity--;

    if (item.quantity === 0) {
      this.remove(item);
    }

    this.computeCartTotals();

  }

  remove(item: CartItem) {

    const itemIndex = this.cartItems.findIndex(item => item.id === item.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }

  }

  private logCartData(totalQuantityValue: number, totalPriceValue: number) {

    console.clear();

    console.log('----------------------------------');

    console.log(JSON.stringify(this.cartItems));


    console.log('------------- Contents of the cart -------------');

    for (let currentCartItem of this.cartItems) {
      const subTotalPrice = currentCartItem.quantity * currentCartItem.unitPrice;
      console.log(`name: ${currentCartItem.name}, quantity: ${currentCartItem.quantity}, unitPrice: ${currentCartItem.unitPrice}, subTotalPrice: ${subTotalPrice} `);
    }

    console.log('----------------------------------');


    console.log(`Cart quantity total geral: ${totalQuantityValue}`);
    console.log(`Cart value total geral: $${totalPriceValue.toFixed(2)}`);

    console.log('----------------------------------');


    /*--------------------------------------------------------------------

      [
        {
          "id":1,
          "name":"Crash Course in Python",
          "imageUrl":"assets/images/products/books/book-luv2code-1000.png",
          "unitPrice":14.99,
          "quantity":2
        },
        {
          "id":2,
          "name":"Become a Guru in JavaScript",
          "imageUrl":"assets/images/products/books/book-luv2code-1001.png",
          "unitPrice":20.99,
          "quantity":1
        }
      ]

    ------------- Contents of the cart -------------

    name: Crash Course in Python, quantity: 2, unitPrice: 14.99, subTotalPrice: 29.98
    name: Become a Guru in JavaScript, quantity: 1, unitPrice: 20.99, subTotalPrice: 20.99

    ----------------------------------

    Cart quantity total geral: 3
    Cart value total geral: $50.97

    --------------------------------------------------------------------*/

  }

}









