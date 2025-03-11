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

  constructor(private httpClient: HttpClient) { }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>('http://localhost:8085/api/product-categories?projection=productCategoryProjection')
      .pipe(map(response => response._embedded.productCategories));
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `http://localhost:8085/api/products/search/findByCategoryId?id=${categoryId}&projection=productCatalogProjection`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginated(thePage: number,
                          thePageSize: number,
                          categoryId: number): Observable<GetResponseProductCatalog> {
    const searchUrl = `http://localhost:8085/api/products/search/findByCategoryId?page=${thePage}&size=${thePageSize}&id=${categoryId}&projection=productCatalogProjection`;
    return this.httpClient.get<GetResponseProductCatalog>(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `http://localhost:8085/api/products/search/findByNameContainingIgnoreCase?name=${theKeyword}&projection=productCatalogProjection`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginated(thePage: number,
                          thePageSize: number,
                          theKeyword: string): Observable<GetResponseProductCatalog> {
    const searchUrl = `http://localhost:8085/api/products/search/findByNameContainingIgnoreCase?name=${theKeyword}&page=${thePage}&size=${thePageSize}&projection=productCatalogProjection`;
    return this.httpClient.get<GetResponseProductCatalog>(searchUrl);
  }

  getProductDetail(productId: number): Observable<Product> {
    const produtctUrl = `http://localhost:8085/api/products/${productId}?projection=productCatalog`;
    return this.httpClient.get<Product>(produtctUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProductCatalog>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponseProductCatalog {

  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }

}

interface GetResponseProductCategory {
  _embedded: {
    productCategories: ProductCategory[];
  }
}












