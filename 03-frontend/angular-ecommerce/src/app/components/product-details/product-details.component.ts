import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  private cartService = inject(CartService);

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.handleProductsDetails();
    })
  }

  private handleProductsDetails() {

    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductDetail(productId).subscribe(
      data => {
        this.product = data
      }
    )

  }

  protected addToCart() {

    console.log(`Adding to cart: ${this.product.name} - ${this.product.unitPrice}`);

    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);

  }

}













