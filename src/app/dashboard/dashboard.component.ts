import { Component, OnInit } from '@angular/core';
import { Sale } from '../models/sales';
import {SalesService} from '../services/sales.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  view: any[] = [window.innerWidth / (1.5), 700];
  years = [];
  data: Array<Sale>;
  show = false;
  // Analytics type: 1 for Total sales, 2 for total items sold, 3 total revenue;
  type = 1;
  analytics: Array<any>;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  showXAxisLabel = true;
  xAxisLabel = 'Category';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  multi = [];

  legendPosition = 'below';

  cities = [
    'Philadelphia',
    'Washington',
    'Los Angeles',
    'Columbus',
    'Chicago',
    'Miami',
    'San Antonio',
    'Houston',
    'New York City',
    'Jacksonville',
    'San Diego',
    'Denver',
    'Seattle',
    'San Francisco',
    'Fresno',
    'Long Beach',
    'Pasadena',
    'San Jose',
    'Louisville',
    'Springfield',
  ];

  departments = [
    'Office Supplies',
    'Furniture',
    'Technology',
  ];

  constructor(
    private salesService: SalesService,
    private ngxService: NgxUiLoaderService,
  ) {
    this.analytics = [];
    this.getData();
  }

  onSelect(event): any {
    console.log(event);
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

  getData(): any {
    this.ngxService.start();
    const check = this.salesService.getLocal();
    if (check == null) {
      this.salesService.fetch().subscribe((response: Response) => {
        this.data =  this.salesService.store(response);
        if (this.data !== null && this.data !== undefined) {
          this.display();
        }
      });
    }

    else {
      this.data = check;
      if (this.data !== null && this.data !== undefined) {
        this.display();
      }
    }
  }

  filterPerCity(city: string, records: Array<any>): any {
    const values = [];
    for (const iterator of records) {
      if (iterator.city === city) {
        values.push(iterator);
      }
    }
    return this.getNumbers(values);
  }

  filterPerDepartment(department: string, records: Array<any>): any {
    const values = [];
    for (const iterator of records) {
      if (iterator.category === department) {
        values.push(iterator);
      }
    }
    return this.getNumbers(values);
  }

  filterCity(): any {
    this.analytics = [];
    for (const i of this.cities) {
      const values = [];
      for (const iterator of this.data) {
        if (iterator.city === i) {
          values.push(iterator);
        }
      }
      this.analytics.push(
        {
          name: i,
          value: this.getNumbers(values)
        }
      );
    }
    this.xAxisLabel = 'Cities';
    console.log(this.analytics);
  }

  filterDepartment(): any {
    this.analytics = [];
    for (const i of this.departments) {
      const values = [];
      for (const iterator of this.data) {
        if (iterator.category === i) {
          values.push(iterator);
        }
      }
      this.analytics.push(
        {
          name: i,
          value: this.getNumbers(values)
        }
      );
    }
    this.xAxisLabel = 'Departments';
    console.log(this.analytics);
  }

  getNumbers(data: Array<Sale>): any {
    let count = 0;
    switch (this.type) {
      case 1:
        count = data.length;
        break;
      case 2:
        for (const iterator of data) {
          count = count + +iterator.quantity;
        }
        break;
      case 3:
        for (const iterator of data) {
          count = count + +iterator.sales;
        }
        break;
      default:
        break;
    }
    return count;
  }

  filter(field: string, value: string): any {
    const list = [];
    this.data.map((r) => {
      if (value !== null) {
        if (r[field] === value) {
          list.push(
            {
              name: field,
              value: r[field]
            }
          );
        }
      }
      else {

      }
    });
  }

  getYears(): any {
    for (const iterator of this.data) {
      if (!this.years.includes(moment(iterator.orderDate).year())) {
        this.years.push(moment(iterator.orderDate).year());
      }
    }
    this.years.sort((a, b) => {
      return a - b;
    });
    console.log(this.years);
  }

  yearRecords(year: any): any {
    const results = [];
    for (const iterator of this.data) {
      if (year === moment(iterator.orderDate).year()) {
        results.push(iterator);
      }
    }
    return results;
  }

  changeType(event): any {
    this.ngxService.start();
    this.show = false;
    const target = event.target;
    console.log(target);
    this.type = +target.value;
    console.log(this.type);
    this.display();
    this.ngxService.stop();
  }

  changeProcess(event): any {
    this.ngxService.start();
    this.show = false;
    const target = event.target;
    console.log(target);
    if (target.value === '1') {
      this.filterCity();
    }
    else {
      this.filterDepartment();
    }
    this.timelineData(+target.value);
    this.show = true;
    this.ngxService.stop();
  }

  display(): any {
    this.getYears();
    console.log(this.data);
    this.show = true;
    this.filterCity();
    this.timelineData(1);
    this.ngxService.stop();
  }

  timelineData(type: number): any {
    this.multi = [];
    if (type === 1) {
      for (const iterator of this.cities) {
        this.multi.push(
          {
            name: iterator,
            series: this.years.map((r) => {
              return {
                name: r.toString(),
                value: this.filterPerCity(iterator, this.yearRecords(r))
              };
            })
          },
        );
      }
    }
    else {
      for (const iterator of this.departments) {
        this.multi.push(
          {
            name: iterator,
            series: this.years.map((r) => {
              return {
                name: r.toString(),
                value: this.filterPerDepartment(iterator, this.yearRecords(r))
              };
            })
          },
        );
      }
    }
    console.log(this.multi);
  }
}
