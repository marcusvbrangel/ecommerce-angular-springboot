import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: 'product-list-grid.component.html',
  styleUrl: './product-list.component.css',
  
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  private listProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
   
    const currentCategoryId = hasCategoryId ? +this.route.snapshot.paramMap.get('id')! : 1;
    
    this.productService.getProductList(currentCategoryId).subscribe(
      data => this.products = data
    )

  }

}
