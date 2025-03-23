import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {CheckoutService} from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, NgForOf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutService = inject(CheckoutService);

  formBuilder = inject(FormBuilder);

  checkoutFormGroup!: FormGroup;

  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  creditCardYear: number[] = [];
  creditCardMonths: number[] = [];

  constructor() {
  }

  ngOnInit(): void {

    this.buildForm();

    this.loadCreditCardMonths();

    this.loadCreditCardYear();

  }

  buildForm() {

    this.checkoutFormGroup = this.formBuilder.group({

      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),

    });

  }

  onSubmit() {
    console.log('Handling the submit form');
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log('The email address is: ' + this.checkoutFormGroup.get('customer')!.value.email);
  }

  copyShippingAddressToBillingAddress($event: Event) {

    if (($event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }

  }

  private loadCreditCardMonths() {

    const startMonth = new Date().getMonth() + 1;

    this.checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

  private loadCreditCardYear() {

    this.checkoutService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYear = data;
      }
    );

  }

  handleMonthsAndYear() {

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup!.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

}





















