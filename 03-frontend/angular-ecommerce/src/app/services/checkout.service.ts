import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Purchase} from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private host = 'localhost:8085';
  private purchaseUrl = `http://${this.host}/api/checkout/purchase`;
  private httpClient = inject(HttpClient);

  constructor() { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);

  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);

  }











}
