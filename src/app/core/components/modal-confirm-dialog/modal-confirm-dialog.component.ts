import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm-dialog',
  templateUrl: './modal-confirm-dialog.component.html',
  styleUrls: ['./modal-confirm-dialog.component.scss']
})
export class ModalConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ModalConfirmDialogComponent>) {
  }

  @Input()
  public title: string = 'Confirm Action';
  @Input()
  public message: string = 'Confirm Action';
  @Input()
  public yesButtonText: string = 'Yes';
  @Input()
  public noButtonText: string = 'No';

  public confirm(): void {
    this.dialogRef.close({ primary: true });
  }

  public decline(): void {
    this.dialogRef.close({ primary: false });
  }

}
