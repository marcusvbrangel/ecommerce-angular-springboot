import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPerson } from '../../models/sales-person';

@Component({
  selector: 'app-sales-person-list',
  imports: [CommonModule],
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css'] 
})
export class SalesPersonListComponent {

  salesPersonList: SalesPerson[] = [
    new SalesPerson("John", "Doe", "john.doe@example.com", 50000),
    new SalesPerson("Jane", "Smith", "jane.smith@example.com", 60000),
    new SalesPerson("Michael", "Johnson", "michael.johnson@example.com", 70000),
    new SalesPerson("Emily", "Davis", "emily.davis@example.com", 80000),
  ];

}
