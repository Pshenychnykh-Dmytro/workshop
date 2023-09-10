import { Component } from '@angular/core';
import { RoutePath } from '@core/constants/route-path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public readonly routePath = RoutePath;

}
