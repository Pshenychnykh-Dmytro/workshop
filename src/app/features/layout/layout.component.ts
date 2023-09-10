import { Component } from '@angular/core';
import { RoutePath } from '@core/constants/route-path';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public routePath = RoutePath;
}
