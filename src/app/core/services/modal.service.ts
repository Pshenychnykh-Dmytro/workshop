import { Injectable, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { ModalSettings } from '../models/modal-settings';
import { rootInject } from 'app/app.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmDialogComponent, ModalConfirmDialogData } from '@core/components/modal-confirm-dialog/modal-confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ModalService {

  constructor(private dialogSvc: MatDialog) {
  }

  public openConfirm(data: ModalConfirmDialogData=null): Observable<{primary: boolean}> {
    return this.dialogSvc.open(ModalConfirmDialogComponent,
      {
        disableClose: true,
        closeOnNavigation: true,
        minWidth: '400px',
        data
    }).afterClosed();
  }
  /*
  private openDialogModals: DialogRef[] = [];

  constructor(private dialogService: DialogService, private router: Router) {
    this.closeAllOpenModalsOnRouteChange();
  }

  public openConfirm(
    content: string | TemplateRef<any>,
    textTitle: string = 'Confirm',
    yesText: string = 'Yes',
    noText: string = 'No'
  ): Observable<DialogResult> {
    const dialogRef = this.openDialog({
      title: textTitle,
      content,
      actions: [
        { text: noText, cssClass: 'btn btn-warning' },
        { text: yesText, primary: true, cssClass: 'btn btn-success' },
      ],
      width: '95%',
      maxWidth: 600,
    } as ModalSettings);

    dialogRef.dialog.location.nativeElement.classList.add('m-confirmation-dialog');

    return dialogRef.result;
  }

  public openModal(options: ModalSettings): DialogRef {
    const dialogRef = this.openDialog(options);

    if (options.wrapperClassNames) {
      options.wrapperClassNames.forEach((x) => dialogRef.dialog.location.nativeElement.classList.add(x));
    }

    return dialogRef;
  }

  public openInfo(content: string, textTitle: string = 'Info', buttonText: string = 'OK'): Observable<DialogResult> {
    const dialogRef = this.openDialog({
      title: textTitle,
      content,
      actions: [{ text: buttonText, primary: true, cssClass: 'btn btn-success' }],
      width: '95%',
      maxWidth: 700,
    } as ModalSettings);

    dialogRef.dialog.location.nativeElement.classList.add('m-info-dialog');

    return dialogRef.result;
  }

  private openDialog(options: ModalSettings): DialogRef {
    const dialogRef = this.dialogService.open(options);
    this.openDialogModals.push(dialogRef);
    this.handleModalClosing(dialogRef);
    return dialogRef;
  }

  private handleModalClosing(dialogRef: DialogRef): void {
    const subscription = dialogRef.result.subscribe((result) => {
      if (result instanceof DialogCloseResult) {
        this.openDialogModals = this.openDialogModals.filter((instance) => instance !== dialogRef);
        subscription.unsubscribe();
      }
    });
  }

  private closeAllOpenModalsOnRouteChange(): void {
    this.router.events.pipe(filter(() => this.openDialogModals.length > 0)).subscribe(() => this.cleanUpModals());
  }

  private cleanUpModals(): void {
    this.openDialogModals.forEach((x) => x.close());
    this.openDialogModals = [];
  }

  public tryCloseLastModal(): boolean {
    const hasOpened = this.openDialogModals.length > 0;
    if (hasOpened) {
      this.openDialogModals.pop().close();
    }
    return hasOpened;
  }*/
}

export function ConfirmAction(message = 'Confirm action ?',
                              title = 'Confirm',
                              yesButtonText = 'Yes',
                              noButtonText = 'No'): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const dialogSvc = rootInject(ModalService);
    const original = descriptor.value;
    descriptor.value = function (): any {
      dialogSvc.openConfirm({ title, message, yesButtonText, noButtonText }).subscribe((result: any) => {
        if (result.primary) {
          return original.apply(this, arguments);
        }
      });
    };
    return descriptor;
  };
}
