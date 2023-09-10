import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { RoutePath } from '@core/constants/route-path';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    { path: '', redirectTo: RoutePath.computers, pathMatch: 'full' },
    { path: RoutePath.computers, loadChildren: () => import('./computers/computers.module').then(m=> m.ComputersModule) },
    { path: RoutePath.phones, loadChildren: () => import('./phones/phones.module').then(m=> m.PhonesModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
