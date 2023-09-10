export class ToastSettings {
  type: ToastType;
  message: string;
  alertId: string;
  keepAfterRouteChange: boolean;
  closable: boolean;

  constructor(init?: Partial<ToastSettings>) {
    Object.assign(this, init);
  }
}

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}
