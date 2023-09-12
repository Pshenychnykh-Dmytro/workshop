import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { rootInject } from 'app/app.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {
  }

  private open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  public success(message: string = 'Success !') {
    this.open(message, 'ok');
  }
}

export function SuccessToast(successMessage = 'Success!') {
  const toastSvc = rootInject(ToastService);
  toastSvc.success(successMessage);
}

export function ErrorToast(errorMessage = 'Error!') {
  const toastSvc = rootInject(ToastService);
  toastSvc.error(errorMessage);
}

export function AsyncResponseToast(
  successMessage: string = 'Data has been saved successfully!',
  errorHandler?: (error: any) => void
): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const toastSvc = rootInject(ToastService);
    const origin = descriptor.value;
    descriptor.value = function (): any {
      return origin.apply(this, arguments).pipe(
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
