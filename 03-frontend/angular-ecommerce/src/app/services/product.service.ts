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

  private readonly BASE_URL = 'http://localhost:8085/api/products';
  private readonly CATEGORY_URL = 'http://localhost:8085/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]> {
                                 
    const searchUrl = `${this.BASE_URL}/search/findByCategoryId?id=${categoryId}&projection=productCatalog`;
    return this.httpClient.get<GetResponseProductCatalog>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseProductCategory>(this.CATEGORY_URL)
      .pipe(map(response => response._embedded.productCategory));
  }

}

interface GetResponseProductCatalog {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}



