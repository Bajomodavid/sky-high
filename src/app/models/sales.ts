import * as moment from 'moment';

export class Sale
{
  category: string;
  city: string;
  country: string;
  customerId: string;
  customerName: string;
  discount: string;
  orderDate: moment.Moment;
  orderId: string;
  postalCode: string;
  productId: string;
  productName: string;
  profit: string;
  quantity: string;
  region: string;
  rowId: string;
  sales: string;
  segment: string;
  shipDate: moment.Moment;
  shipMode: string;
  state: string;
  subCategory: string;

  constructor(sales: any) {
    // your logic
    // tslint:disable-next-line:no-string-literal
    this.category = sales['Category'];
    // tslint:disable-next-line:no-string-literal
    this.city = sales['City'];
    // tslint:disable-next-line:no-string-literal
    this.country = sales['Country'];
    // tslint:disable-next-line:no-string-literal
    this.customerId = sales['Customer ID'];
    // tslint:disable-next-line:no-string-literal
    this.customerName = sales['Customer Name'];
    // tslint:disable-next-line:no-string-literal
    this.discount = sales['Discount'];
    // tslint:disable-next-line:no-string-literal
    this.orderDate = moment(sales['Order Date'].replaceAll('/', '-'));
    // tslint:disable-next-line:no-string-literal
    this.orderId = sales['Order ID'];
    // tslint:disable-next-line:no-string-literal
    this.postalCode = sales['Postal Code'];
    // tslint:disable-next-line:no-string-literal
    this.productId = sales['Product ID'];
    // tslint:disable-next-line:no-string-literal
    this.productName = sales['Product Name'];
    // tslint:disable-next-line:no-string-literal
    this.profit = sales['Profit'];
    // tslint:disable-next-line:no-string-literal
    this.quantity = sales['Quantity'];
    // tslint:disable-next-line:no-string-literal
    this.region = sales['Region'];
    // tslint:disable-next-line:no-string-literal
    this.rowId = sales['Row ID'];
    // tslint:disable-next-line:no-string-literal
    this.sales = sales['Sales'];
    // tslint:disable-next-line:no-string-literal
    this.segment = sales['Segment'];
    // tslint:disable-next-line:no-string-literal
    this.shipDate = moment(sales['Ship Date'].replaceAll('/', '-'));
    // tslint:disable-next-line:no-string-literal
    this.shipMode = sales['Ship Mode'];
    // tslint:disable-next-line:no-string-literal
    this.state = sales['State'];
    this.subCategory = sales['Sub-Category'];
  }
}
