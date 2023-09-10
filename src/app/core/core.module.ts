import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmDialogComponent } from './components/modal-confirm-dialog/modal-confirm-dialog.component';
import { ModalConfirmActionComponent } from './components/modal-confirm-action/modal-confirm-action.component';



@NgModule({
  declarations: [
    ModalConfirmDialogComponent,
    ModalConfirmActionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
