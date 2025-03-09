import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
  
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly CATEGORIES_URL = 'http://localhost:8085/api/product-categories?projection=productCategoryProjection';
  // private readonly CATEGORIES_URL = 'http://localhost:8085/api/product-categories/search/findAll?projection=productCategoryProjection';
  private readonly PRODUCTS_URL = 'http://localhost:8085/api/products/search/findByCategoryId';

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.CATEGORIES_URL)
      .pipe(map(response => response._embedded.productCategory));
  }

  getProductList(categoryId: number): Observable<Product[]> {   
    const searchUrl = `${this.PRODUCTS_URL}?id=${categoryId}&projection=productCatalogProjection`;
    return this.httpClient.get<GetResponseProductCatalog>(searchUrl)
      .pipe(map(response => response._embedded.product));
  }

}

interface GetResponseProductCatalog {
  _embedded: {
    product: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}



