import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  formBuilder = inject(FormBuilder);

  checkoutFormGroup!: FormGroup;

  totalQuantity: number = 0;
  totalPrice: number = 0.00;

  constructor() {
  }

  ngOnInit(): void {
    this.buildForm();
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




}







