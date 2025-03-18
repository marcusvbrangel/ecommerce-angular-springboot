import {Component, inject, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {

  private cartService = inject(CartService);

  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus() {

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

  }


}







