import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm-dialog',
  templateUrl: './modal-confirm-dialog.component.html',
  styleUrls: ['./modal-confirm-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class ModalConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalConfirmDialogData, public dialogRef: MatDialogRef<ModalConfirmDialogComponent>) {
  }

  ngOnInit(): void {
    this.title = this.data?.title ?? this.title;
    this.message = this.data?.message ?? this.message;
    this.yesButtonText = this.data?.yesButtonText ?? this.yesButtonText;
    this.noButtonText = this.data?.noButtonText ?? this.noButtonText;
  }

  public title: string = 'Confirm';
  public message: string = 'Confirm Action';
  public yesButtonText: string = 'Yes';
  public noButtonText: string = 'No';

  public confirm(): void {
    this.dialogRef.close({ primary: true });
  }

  public decline(): void {
    this.dialogRef.close({ primary: false });
  }
}

export interface ModalConfirmDialogData {
  title?: string;
  message?: string;
  yesButtonText?: string;
  noButtonText?: string;
}
