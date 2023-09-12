import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ModalService } from '@core/services/modal.service';
import { ITouchable } from '@core/interfaces/touchable';

@Injectable({
  providedIn: 'root',
})
export class DiscardChangesGuard<T extends ITouchable> implements CanDeactivate<T> {
  constructor() {}

  canDeactivate(
    component: T,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return DiscardChangesFn(component);
  }
}

export function DiscardChangesFn<T extends ITouchable>(component: T) {
  const dialogSvc = inject(ModalService);
  return component?.isTouched
    ? dialogSvc
        .openConfirm({ message: component?.discardChangesMessage ?? 'Discard Changes ?', yesButtonText: 'Discard' })
        .pipe(map((result: any) => !!result.primary))
    : true;
}
