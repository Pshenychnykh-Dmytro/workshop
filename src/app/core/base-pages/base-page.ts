import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { inject } from '@angular/core';

/*
 * @Implemented by:
 *    Pshenychnykh Dmytro;
 ! Attention:
 !    This is high abstract level feature.
 !    Providing changes here could damage all application.
 !    Check usages for current class and methods before.
 !    Provide only common abstract features here.
 * @Description:
 *    The BasePageComponent class is a parent of the base pages hierarchy.
 *    It is used for creating any pages
 *    This class contains:
 *       - navigation logic;
 *       - loading indicator;
 *       - routing & url params logic;
*/
export abstract class BasePage {
  private _loading = true;
  private _loadingChanged$: BehaviorSubject<boolean> = new BehaviorSubject(this._loading);

  // * turn on/of loader and indicates when page in loading process
  public get loading() {
    return this._loading;
  }

  public set loading(value) {
    this._loading = value;
    this._loadingChanged$.next(this._loading);
  }

  public get loadingChanged(): Observable<boolean> {
    return this._loadingChanged$.asObservable();
  }

  protected location = inject(Location);
  // * link to the page on the parent layer
  protected parentLayerLink = '../';
  // * current route
  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);

  constructor() {
    // calculate current route
    while (this.route.firstChild) {
      this.route = this.route.firstChild;
    }
  }

  /*
   * @Description:
   *    Navigates to the previous page, by history
   */
  protected goBack(): void {
    this.location.back();
  }

  /*
   * @Description:
   *    Navigates to the parent layer page, by link.
   */
  protected goParentLayer(): void {
    this.router.navigate([this.parentLayerLink], { relativeTo: this.route });
  }

  /*
   * @Description:
   *    Find url param from the current route by param name wrapper.
   */
  protected findParam(paramName: string): string {
    return findParam(paramName, this.route);
  }
}

/*
 * @Description:
 *    Find url param from the route by param name
 * @Param:
 *    paramName - name of the route param;
 *    route - current route;
 * @Returns:
 *    The value of the url param.
 */
export function findParam(paramName: string, route: ActivatedRoute): string {
  const param = route.snapshot.paramMap.get(paramName);
  if (!param && route.parent) {
    return findParam(paramName, route.parent);
  } else {
    return param;
  }
}
