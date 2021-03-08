import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'angular-highcharts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    NgxChartsModule,
    NgxUiLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
