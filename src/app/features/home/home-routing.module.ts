import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RoutePath } from '@core/constants/route-path';
import { DecoratorsDemoComponent } from './decorators-demo/decorators-demo.component';
import { GuardsDemoComponent } from './guards-demo/guards-demo.component';
import { DiscardChangesFn } from '@core/guards/discard-changes.guard';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {
      path: '',
      redirectTo: RoutePath.demo1,
      pathMatch: 'full'
    },
    {
      path: RoutePath.demo1,
      component: DecoratorsDemoComponent
    },
    {
      path: RoutePath.demo2,
      component: GuardsDemoComponent,
      canDeactivate: [DiscardChangesFn]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
