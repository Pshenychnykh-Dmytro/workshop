import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

import { ToastSettings, ToastType } from '../models/toast-settings';
import { RootInject, AppModule } from 'app/app.module';

@Injectable({
  providedIn: 'root',
})
export class EcnToastService {
  /*
  constructor(private kendoNotificationService: NotificationService) {}

  success(message: string, alertId?: string): void {
    this.show(new ToastSettings({ message, type: ToastType.Success, alertId }));
  }

  error(message: any, alertId?: string): void {
    const msg = (message?.message ? message.message : String(message)) as string;
    this.show(new ToastSettings({ message: msg, type: ToastType.Error, alertId }));
  }

  pipeError(message: string, alertId?: string): Observable<any> {
    this.error(message, alertId);
    return throwError(() => message);
  }

  info(message: string, alertId?: string): void {
    this.show(new ToastSettings({ message, type: ToastType.Info, alertId }));
  }

  warn(message: string, alertId?: string): void {
    this.show(new ToastSettings({ message, type: ToastType.Warning, alertId }));
  }

  private show(alert: ToastSettings): void {
    this.kendoNotificationService.show({
      content: alert.message,
      hideAfter: 1000,
      position: { horizontal: 'right', vertical: 'bottom' },
      animation: { type: 'fade', duration: 1000 },
      type: { style: alert.type, icon: true },
      height: 35,
      closable: alert.closable,
    });
  }
  */
}

export function SuccessToast(successMessage = 'Success!') {
  const toastSvc = RootInject(EcnToastService);
  toastSvc.success(successMessage);
}

export function ErrorToast(errorMessage = 'Error!') {
  const toastSvc = RootInject(EcnToastService);
  toastSvc.error(errorMessage);
}

export function AsyncResponseToast(
  successMessage: string = 'Data has been saved successfully!',
  errorHandler?: (error: any) => void
): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const toastSvc = RootInject(EcnToastService);
    const origin = descriptor.value;
    descriptor.value = function (): any {
      return origin.apply(this, arguments).pipe(
        // tap(() => toastSvc.success(successMessage)),
        tap({
          next: () => toastSvc.success(successMessage),
          error: ({ status, message, source }) => {
            if (errorHandler) {
              errorHandler(source);
            }
          },
        })
      );
    };
    return descriptor;
  };
}
