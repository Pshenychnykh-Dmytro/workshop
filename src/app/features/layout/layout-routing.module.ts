import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { RoutePath } from '@core/constants/route-path';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path: '', redirectTo: RoutePath.home, pathMatch: 'full' },
    { path: RoutePath.home, loadChildren: () => import('../home/home.module').then(m => m.HomeModule )},
    { path: RoutePath.products, loadChildren: () => import('../products/products.module').then(m => m.ProductsModule )},
    { path: RoutePath.settings, loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule )}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
