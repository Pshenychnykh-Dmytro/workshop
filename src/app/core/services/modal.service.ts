import { Injectable, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { ModalSettings } from '../models/modal-settings';
import { rootInject } from 'app/app.module';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmDialogComponent, ModalConfirmDialogData } from '@core/components/modal-confirm-dialog/modal-confirm-dialog.component';
import { UserItemModel } from '@core/models/user-model';
import { ModalUserSearchComponent } from '@core/components/modal-user-search/modal-user-search.component';

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

  public openUserSearch(users: UserItemModel[]): Observable<UserItemModel[]> {
    return this.dialogSvc.open(ModalUserSearchComponent,
      {
        disableClose: true,
        closeOnNavigation: true,
        minWidth: '1200px',
        data: { users }
    }).afterClosed();
  }
}

export function ConfirmAction(message = 'Confirm action ?',
                              title = 'Confirm',
                              yesButtonText = 'Yes',
                              noButtonText = 'No'): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const dialogSvc = rootInject(ModalService);
    const original = descriptor.value;
    descriptor.value = function (): any {
      console.log(this['users']);
      dialogSvc.openConfirm({ title, message, yesButtonText, noButtonText }).subscribe((result: any) => {
        if (result.primary) {
          return original.apply(this, arguments);
        }
      });
    };
    return descriptor;
  };
}

export function UserSearch(source: string): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const dialogSvc = rootInject(ModalService);
    const original = descriptor.value;
    descriptor.value = function (): any {
      console.log(this[source]);
      dialogSvc.openUserSearch(this[source]).subscribe((result: any) => {
        if(result.primary) {
          return original.apply(this, [result.users]);
        }
      })
    };
    return descriptor;
  };

}
