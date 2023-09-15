import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { RoutePath } from '@core/constants/route-path';
import { DiscardChangesFn } from '@core/guards/discard-changes.guard';

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
    component: EditComponent,
    canDeactivate: [DiscardChangesFn]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputersRoutingModule { }
