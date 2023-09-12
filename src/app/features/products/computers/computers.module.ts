import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ComputerService } from './computer.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ComputersRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    ComputerService
  ]
})
export class ComputersModule { }
