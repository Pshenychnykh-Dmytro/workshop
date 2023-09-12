import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { RoutePath } from '@core/constants/route-path';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: RoutePath.create,
    component: EditComponent
  },
  {
    path: ':id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhonesRoutingModule { }
