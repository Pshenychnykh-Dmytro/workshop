import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { firstValueFrom, map, merge, Observable, of, switchMap, timer } from 'rxjs';

import { ITouchable } from '@core/interfaces/touchable';
import { ICrudService } from '@core/interfaces/crud.service';
import { Dictionary } from '@core/models/dictionary';
import { FormValidationService } from '@core/services/form-validation.service';

import { BaseEditPage } from './base-edit-page';
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
 *    The BaseFormPageComponent class is a part of the base pages hierarchy.
 *    It is used for facilitating the creation of reactive-form pages.
 *    This class contains:
 *       - pipelines for loading the page, depending on the strategy;
 *       - methods for the form building;
 *       - form validation implementation;
 *       - default CRUD operation implementation;
 *       - base async unique validation implementation;
 *       - useful helpers;
 *       - "Discard Changes ? (yes/no)" feature, based on ITouchable interface.
 *          For enabling discard changes - append 'DiscardChangesGuard' to you component at routes;
 *       - loading animation logic;
*/
export abstract class BaseFormPageComponent<TModel> extends BaseEditPage implements ITouchable {
  // * lock the 'touched' status of page (even if the formGroup mark as untouched)
  private _isTouched = false;
  // * Entity ID;
  private _id: any = -1;
  // * The reactive form validation errors dictionary
  private _rootControlError$: Dictionary<Observable<string>> = {};
  // * The root form of the page;
  public formGroup: UntypedFormGroup;
  // * The services for the reactive form validation;
  protected formValidationSvc: FormValidationService;
  // * Indicates is it the "creating new" entity or "editing of existing" entity
  public editMode = false;

  public get controlError$(): Dictionary<Observable<string>> {
    return this._rootControlError$;
  }

  constructor(private crudService: ICrudService<TModel>) {
    super();
    this.formValidationSvc = inject(FormValidationService);
  }

  /*
   * @Description:
   *    This is the one of the loading strategy method.
   *    Use it when you need load the page when you have entity ID param in URL;
   * @Params:
   *    paramName - Name of the url route id param. (for example 'userId');
   */
  public initByRouteParam(paramName: string): void {
    this.editMode = !!(this._id = paramName ? +this.findParam(paramName) : null);
    this._initByEditMode(this.editMode);
  }

  /*
   * @Description:
   *    This is the one of the loading strategy method.
   *    Use it when you have entity ID.
   * @Params:
   *    id - Entity id param. (for example '11234' or 'fg179g2tq');
   */
  protected initById(id: any): void {
    this.editMode = !!(this._id = id);
    this._initByEditMode(this.editMode);
  }

  /*
   * @Description:
   *    This is the one of the loading strategy method.
   *    Use it when you have implemented factory method 'createViewModel()'
   *    where you create default model.
   */
  protected initByDefault(): void {
    const defaultModel = this.createViewModel();
    this.formGroup = this.buildForm(defaultModel);
    this._rootControlError$ = this.buildErrorMessages(this.formGroup.controls);
    this.loading = false;
  }

  /*
   * @Description:
   *    This is the one of the loading strategy method.
   *    Use it when you already have the entity model.
   * @Params:
   *    model - Generic entity model;
   */
  protected initByModel(model: TModel): void {
    this.formGroup = this.buildForm(model);
    this._rootControlError$ = this.buildErrorMessages(this.formGroup.controls);
    this._initDiscardChangesFeature(this.formGroup);
    this.loading = false;
  }

  /*
   * @Description:
   *    Indicates the form state when at least one symbol was changed at any controls.
   */
  override get isTouched(): boolean {
    return this._isTouched && this.formGroup?.touched;
  }

  /*
   * @Description:
   *    Uses as a factory method for creating new entity by default at the page loading pipeline.
   *    Implement it in child component if you component could create new entities.
   *    Leave it not implemented if your component avoid creating new entities.
   * @Returns:
   *    generic viewModel created by default.
   */
  protected abstract createViewModel(): TModel;

  /*
   * @Description:
   *    Implement the creating page form logic at this method in child component.
   *    Here you can manage the form state, append validators and others.
   */
  protected abstract buildForm(model: TModel): UntypedFormGroup;

  /*
   * @Description:
   *    This helper builds the simple form from the flat model.
   * @Params:
   *    controlNames - list of property names (enum or other);
   *    viewModel - the data model;
   */
  protected buildControls<T>(controlNames: any, viewModel: T): { [key: string]: AbstractControl } {
    const props = Object.values(controlNames).map((x) => x as string);
    const controls: { [key: string]: AbstractControl } = {};
    for (const prop of props) {
      if (this.isSimpleProperty(viewModel[prop])) {
        controls[prop] = new UntypedFormControl(viewModel[prop]);
      }
    }
    return controls;
  }

  /*
   * @Description:
   *    This helper recursively builds the form from the root complex model.
   !    Attention: Each field of interface model must have value (null by default).
   *    For appending validators or excluding some props - use 'param' param.
   *    Put validators or excluded prop names on the same struct level as in the view model.
   * @Params:
   *    params: {
   *       validators - structural recursive dictionary with simple validators;
   *       validatorsAsync - structural recursive dictionary with async validators;
   *       excludedProps - structural recursive dictionary with excluded props names;
   *    }
   * @Returns:
   *    The 'FormGroup' with controls and validators. Ready for the view displaying.
   */
  protected buildFormGroup(
    viewModel: any,
    params: {
      validators?: { [key: string]: any };
      validatorsAsync?: { [key: string]: any };
      excludedProps?: { [key: string]: any };
    } = {}
  ): UntypedFormGroup {
    const keys = Object.keys(viewModel);
    const result: { [key: string]: UntypedFormGroup | AbstractControl | UntypedFormArray } = {};
    const prepareValidators = (field, validatorSet) => {
      return !!validatorSet && Array.isArray(validatorSet[field]) ? validatorSet[field] : [];
    };
    const forwardValidators = (field, validatorSet) => {
      return !!validatorSet && validatorSet[field] instanceof Object ? validatorSet[field] : {};
    };

    const getParams = (field) => ({
      validators: forwardValidators(field, params?.validators),
      validatorsAsync: forwardValidators(field, params?.validatorsAsync),
      excludedProps: !!params?.excludedProps ? params.excludedProps[field] : {},
    });

    for (const key of keys) {
      if (!params?.excludedProps || params.excludedProps[key] instanceof Object || !params.excludedProps[key]) {
        if (this.isSimpleProperty(viewModel[key]) || this.isSimpleArray(viewModel[key])) {
          result[key] = new UntypedFormControl(
            viewModel[key],
            prepareValidators(key, params?.validators),
            prepareValidators(key, params?.validatorsAsync)
          );
        } else if (Array.isArray(viewModel[key])) {
          result[key] = this.buildFormArray(viewModel[key], getParams(key));
        } else if (!!viewModel[key]) {
          result[key] = this.buildFormGroup(viewModel[key], getParams(key));
        }
      }
    }

    return new UntypedFormGroup(result);
  }

  /*
   * @Description:
   *    This helper recursively builds the form from the root array model.
   !    Attention: Each field of interface model must have value (null by default).
   *    For appending validators or excluding some props - use 'param' param.
   *    Put validators or excluded prop names on the same struct level as in the view model.
   * @Params:
   *    params: {
   *       validators - structural recursive dictionary with simple validators;
   *       validatorsAsync - structural recursive dictionary with async validators;
   *       excludedProps - structural recursive dictionary with excluded props names;
   *    }
   * @Returns:
   *    The 'FormArray' with controls and validators. Ready for the view displaying.
   */
  protected buildFormArray(
    arr: any[],
    params: {
      validators?: any;
      validatorsAsync?: any;
      excludedProps?: any;
    } = {}
  ): UntypedFormArray {
    const result: (UntypedFormControl | UntypedFormGroup | UntypedFormArray)[] = [];
    const prepareValidators = (validatorSet) => (!!validatorSet && Array.isArray(validatorSet) ? validatorSet : []);
    const forwardValidators = (validatorSet) => (validatorSet instanceof Object ? validatorSet : []);
    const getParams = () => ({
      validators: forwardValidators(params.validators),
      validatorsAsync: forwardValidators(params.validatorsAsync),
      excludedProps: params.excludedProps,
    });

    for (const item of arr) {
      // TODO: need to think, it is not needed for simple array
      /*
      if (this.isSimpleProperty(item)) {
        result.push(
          new UntypedFormControl(item, prepareValidators(params.validators), prepareValidators(params.validatorsAsync))
        );
      } else*/
      if (Array.isArray(item)) {
        result.push(this.buildFormArray(item, getParams()));
      } else if (!!item) {
        result.push(this.buildFormGroup(item, getParams()));
      }
    }
    return new UntypedFormArray(result);
  }

  private isSimpleArray(item: any): boolean {
    return Array.isArray(item) && item.every((x) => this.isSimpleProperty(x));
  }

  private isSimpleProperty(item: any): boolean {
    return item instanceof Date || !(item instanceof Object);
  }

  /*
   * @Description:
   *    Builds default error messages for the controls with validators.
   * @Params:
   *    controls - dictionary set of controls;
   * @Returns:
   *    flat dictionary with async error messages. Async messages is used by the 'FormValidationService'.
   */
  protected buildErrorMessages(controls: { [key: string]: AbstractControl }): Dictionary<Observable<string>> {
    const controlError: Dictionary<Observable<string>> = {};
    for (const [key, control] of Object.entries(controls)) {
      const messages: Observable<string>[] = [];
      if (control.validator) {
        messages.push(this.formValidationSvc.error$(control));
      }
      if (control.asyncValidator) {
        messages.push(this.formValidationSvc.asyncError$(control));
      }
      if (messages.length > 0) {
        controlError[key] = merge(...messages);
      }
    }
    return controlError;
  }

  /*
   * @Description:
   *    Default implementation of the 'save changes' view logic
   */
  public override save(): void {
    if (this.formGroup.valid) {
      this.formGroup.markAsUntouched();
      this.loading = true;
      this.saveAsync(this.formGroup.value).subscribe(() => {
        this.goBack();
      });
    } else {
      this.formValidationSvc.validateForm(this.formGroup);
    }
  }

  /*
   * @Description:
   *    Default implementation of the 'delete entity' view logic.
   */
  public remove(): void {
    this.formGroup.markAsUntouched();
    this.removeAsync().subscribe(() => {
      // ! According to EX-2863 issue - need always return to the parent route layer on remove
      this.goParentLayer();
    });
  }

  /*
   * @Description:
   *    Default implementation of the 'cancel changes' view logic.
   */
  public override cancel(): void {
    this.formGroup.markAsUntouched();
    this.goBack();
  }

  /*
   * @Description:
   *    The default 'GET' method implementation.
   *    Part of the REST API async methods of CRUD operations logic.
   *    In missing crudService injection case - method must be overridden.
   * @Returns:
   *    The generic observable root dataModel.
   */
  protected getAsync() {
    if (this.crudService) {
      return this.crudService.get(this._id);
    } else {
      throw new Error(`ICrudService was not injected!. Please inject service or override 'getAsync()' method !`);
    }
  }

  /*
   * @Description:
   *    The default 'POST' method implementation.
   *    Part of the REST API async methods of CRUD operations logic.
   *    In missing crudService injection case - method must be overridden.
   */
  protected saveAsync(data: TModel) {
    if (this.crudService) {
      return this.crudService.save(data);
    } else {
      throw new Error(`ICrudService was not injected!. Please inject service or override 'saveAsync()' method !`);
    }
  }

  /*
   * @Description:
   *    The default 'DELETE' method implementation.
   *    Part of the REST API async methods of CRUD operations logic.
   *    In missing crudService injection case - method must be overridden.
   */
  protected removeAsync() {
    if (this.crudService) {
      return this.crudService.delete(this._id);
    } else {
      throw new Error(`ICrudService was not injected!. Please inject service or override 'removeAsync()' method !`);
    }
  }

  /*
   * @Description:
   *    The default async validation REST implementation.
   *    Part of the REST API async methods of CRUD operations logic.
   *    In missing crudService injection case - method must be overridden.
   * @Params:
   *    object - the validation model;
   * @Returns:
   *    Observable<{ invalid: boolean }> model. Async (invalid: 'true') if validation was failed.
   */
  protected validateAsync(object: any) {
    if (this.crudService) {
      return this.crudService.validate(object);
    } else {
      throw new Error(
        `ICrudService was not injected!. Please inject service or override 'validateAsync(object: any)' method !`
      );
    }
  }

  /*
   * @Description:
   *    The default async validation method wrapper for the form control async validation.
   * @Params:
   *    originValue - the default value, will be ignored for validation;
   *    controlName - the validating field name;
   * @Returns:
   *    AsyncValidator -> 'unique: true | null'.
   */
  protected validateUniqueAsync(originValue: string, controlName: string): any {
    return this._validateUniqueAsync(originValue, (value) => this.validateAsync({ [controlName]: value }));
  }

  private _initByEditMode(editMode: boolean): void {
    if (editMode) {
      this.getAsync().subscribe((model) => {
        this.initByModel(model);
      });
    } else {
      this.initByDefault();
    }
  }

  private _initDiscardChangesFeature(formGroup: UntypedFormGroup): void {
    this.formGroup?.markAsUntouched();
    firstValueFrom(formGroup?.valueChanges).then(() => this._isTouched = true);
  }

  private _validateUniqueAsync(originValue, callback: (value) => Observable<{ invalid: boolean }>) {
    return (control: UntypedFormControl) => {
      return timer(500).pipe(
        switchMap(() => {
          if (control.value?.startsWith(' ')) {
            return of({ whitespaceAtTheBeginning: true });
          } else if (control.value?.endsWith(' ')) {
            return of({ whitespaceAtTheEnd: true });
          } else if (control.value && control.value?.toLocaleLowerCase() !== originValue?.toLocaleLowerCase()) {
            return callback(control.value).pipe(
              map((result) => {
                return result.invalid ? { unique: true } : null;
              })
            );
          } else {
            return of(null);
          }
        })
      );
    };
  }
}
