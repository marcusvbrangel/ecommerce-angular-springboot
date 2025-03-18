import {Component, inject, OnInit} from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-cart-details',
  imports: [
    NgForOf,
    CurrencyPipe
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

}









