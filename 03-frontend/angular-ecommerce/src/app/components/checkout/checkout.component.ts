import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {CheckoutService} from '../../services/checkout.service';
import {CountryStateService} from '../../services/country-state.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, NgForOf],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutService = inject(CheckoutService);
  countryStateService = inject(CountryStateService);

  formBuilder = inject(FormBuilder);

  checkoutFormGroup!: FormGroup;

  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  creditCardYear: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor() {
  }

  ngOnInit(): void {

    this.buildForm();

    this.loadCreditCardMonths();

    this.loadCreditCardYear();

    this.loadCountries();

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
    // console.log('checkoutFormGroup ==>>> ' +  JSON.stringify(this.checkoutFormGroup.get('customer')!.value));

    console.log();
    // console.log('shippingAddress ==>>> ' +  JSON.stringify(this.checkoutFormGroup.get('shippingAddress')!.value));
    console.log('shippingAddress street ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.street);
    console.log('shippingAddress city ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.city);
    console.log('shippingAddress country ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    console.log('shippingAddress state ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.state.name);
    console.log('shippingAddress zipCode ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.zipCode);

  }

  copyShippingAddressToBillingAddress($event: Event) {

    if (($event.target as HTMLInputElement).checked) {

      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      this.billingAddressStates = this.shippingAddressStates;

    } else {

      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];

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

  private loadCountries() {

    this.countryStateService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

  }

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;

    this.countryStateService.getStates(countryCode).subscribe(

      data => {

        if (formGroupName === 'shippingAddress') {

          this.shippingAddressStates = data;

        } else {

          this.billingAddressStates = data;

        }

        if (formGroup) {
          formGroup.get('state')?.setValue(data[0]);
        }

      }

    );

  }



}





















