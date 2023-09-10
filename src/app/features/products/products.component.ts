import { Component } from '@angular/core';
import { RoutePath } from '@core/constants/route-path';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public readonly routePath = RoutePath;

}
