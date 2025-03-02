import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SalesPersonListComponent } from "./components/sales-person-list/sales-person-list.component";

@Component({
  selector: 'app-root',
  imports: [SalesPersonListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sales-project';
}
