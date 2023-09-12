import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonesRoutingModule } from './phones-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PhonesRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PhonesModule { }
