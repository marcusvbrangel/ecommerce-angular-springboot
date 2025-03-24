import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {CheckoutService} from '../../services/checkout.service';
import {CountryStateService} from '../../services/country-state.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';
import {CustomFormValidators} from '../../validators/custom-form-validators';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, NgForOf, NgIf],
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
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.email, CustomFormValidators.notOnlyWhitespace]),
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), CustomFormValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required]),
      }),

    });

  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName')!; }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName')!; }
  get email() { return this.checkoutFormGroup.get('customer.email')!; }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street')!; }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city')!; }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state')!; }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country')!; }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode')!; }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street')!; }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city')!; }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state')!; }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country')!; }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode')!; }

  get creditCardCardType() { return this.checkoutFormGroup.get('creditCard.cardType')!; }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard')!; }
  get creditCardCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber')!; }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode')!; }
  get creditCardExpirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth')!; }
  get creditCardExpirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear')!; }

  onSubmit() {

    if (this.checkoutFormGroup.invalid) {

      this.checkoutFormGroup.markAllAsTouched();

    }

    // console.log('Handling the submit form');
    // console.log('checkoutFormGroup ==>>> ' +  JSON.stringify(this.checkoutFormGroup.get('customer')!.value));

    // console.log();
    // console.log('shippingAddress ==>>> ' +  JSON.stringify(this.checkoutFormGroup.get('shippingAddress')!.value));
    // console.log('shippingAddress street ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.street);
    // console.log('shippingAddress city ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.city);
    // console.log('shippingAddress country ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
    // console.log('shippingAddress state ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.state.name);
    // console.log('shippingAddress zipCode ==>>> ' +  this.checkoutFormGroup.get('shippingAddress')!.value.zipCode);

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





















