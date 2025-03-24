import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Country} from '../common/country';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  constructor(private httpClient: HttpClient) { }

  getCountries() : Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>('http://localhost:8085/api/countries').pipe(
      map(response => response._embedded.countries)
    );

  }

  getStates(theCountryCode: string): Observable<State[]> {

    return this.httpClient.get<GetResponseStates>(`http://localhost:8085/api/states/search/findByCountryCode?code=${theCountryCode}`).pipe(
      map(response => response._embedded.states)
    )

  }

}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
