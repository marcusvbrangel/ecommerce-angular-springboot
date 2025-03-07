import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
  
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly BASE_URL = 'http://localhost:8085/api/products?size=200';

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.BASE_URL)
      .pipe(map(response => response._embedded.products));
  }

}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

