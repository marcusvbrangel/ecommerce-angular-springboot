import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  doSearch(value: string): void {
    this.router.navigateByUrl(`/search/${value}`);
  }

}
