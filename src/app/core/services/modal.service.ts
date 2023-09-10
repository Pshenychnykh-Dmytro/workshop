import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { DialogCloseResult, DialogRef, DialogResult, DialogService } from '@progress/kendo-angular-dialog';
import { filter, Observable } from 'rxjs';
import { ModalSettings } from '../models/modal-settings';
import { RootInject } from 'app/app.module';

@Injectable({ providedIn: 'root' })
export class ModalService {
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
  }
}

export function ConfirmAction(confirmationText: string = 'Confirm action ?'): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const dialogSvc = RootInject(ModalService);
    const original = descriptor.value;
    descriptor.value = function (): any {
      dialogSvc.openConfirm(confirmationText).subscribe((result: any) => {
        if (result.primary) {
          return original.apply(this, arguments);
        }
      });
    };
    return descriptor;
  };
}
