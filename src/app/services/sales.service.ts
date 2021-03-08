
import { Injectable } from '@angular/core';
import { Sale } from '../models/sales';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    public http: HttpClient,
  ) { }

  fetch(): any {
    const body = {
      angular_test: 'angular-developer',
    };
    return this.http
    .post(
      environment.api.url,
      JSON.stringify(body),
    );
  }

  getLocal(): any {
    const data = sessionStorage.getItem('sales');
    if (data !== null) {
      return JSON.parse(data);
    }
    return null;
  }

  query(query: any): any {
    // Query local data
    const data = this.getLocal();
  }

  store(array: any): Array<any> {
    const result = this.format(array);
    sessionStorage.setItem('sales', JSON.stringify(result));
    return result;
  }

  format(array: any): Array<any> {
    const result = [];
    for (const iterator of array) {
      result.push(new Sale(iterator));
    }
    return result;
  }
}
