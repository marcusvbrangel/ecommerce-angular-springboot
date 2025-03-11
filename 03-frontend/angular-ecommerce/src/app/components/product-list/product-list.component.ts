import {Component, OnInit} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink, NgbPagination],
  templateUrl: 'product-list-grid.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination...
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  private handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    this.currentCategoryId = hasCategoryId ? +this.route.snapshot.paramMap.get('id')! : 1;


    // check if we have a different category than previous
    // Note: angular will reuse a component if it is currently being viewed

    // if we have a different category id than previous
    // then set the thePageNumber to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginated(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.currentCategoryId).subscribe(this.processResult());

    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data => this.products = data
    // )

  }

  private handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginated(this.thePageNumber -1,
                                                this.thePageSize,
                                                theKeyword).subscribe(this.processResult());

  }

  private processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.thePageNumber + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

}









