import {Component, inject, OnInit} from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    RouterLink
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartService = inject(CartService);

  cartItens: CartItem[] = [];

  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails() {

    this.cartItens = this.cartService.cartItems;

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.computeCartTotals();

  };

  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item);
  }

  remove(item: CartItem) {
    this.cartService.remove(item);
  }
}









